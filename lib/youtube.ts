import { formatDuration } from "date-fns";

export function getVideoDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '') || '0';
  const seconds = (match[3] || '').replace('S', '') || '0';
  
  let result = '';
  if (hours) result += `${hours}:`;
  result += `${minutes.padStart(2, '0')}:`;
  result += seconds.padStart(2, '0');
  
  return result;
}

// Cache for storing video data
let videoCache: any = {
  data: null,
  timestamp: 0,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes in milliseconds
};

export async function getYouTubeVideos(maxResults = 9) {
  try {
    // Check cache first
    const now = Date.now();
    if (videoCache.data && (now - videoCache.timestamp) < videoCache.CACHE_DURATION) {
      console.log('Returning cached data');
      return videoCache.data.slice(0, maxResults);
    }

    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error('YouTube API key not configured');
    }

    // Get channel ID from username/handle
    let channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    
    // If it starts with @, it's a handle - need to get channel ID
    if (channelId?.startsWith('@')) {
      console.log('Getting channel ID from handle:', channelId);
      const handleResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(channelId)}&type=channel&part=snippet`
      );

      if (!handleResponse.ok) {
        throw new Error(`Channel handle lookup failed: ${await handleResponse.text()}`);
      }

      const handleData = await handleResponse.json();
      if (handleData.items && handleData.items.length > 0) {
        channelId = handleData.items[0].id.channelId;
        console.log('Found channel ID:', channelId);
      } else {
        throw new Error('Channel not found for handle: ' + channelId);
      }
    }

    if (!channelId) {
      throw new Error('YouTube channel ID not configured');
    }

    // Get videos using the channel ID
    console.log('Fetching videos for channel:', channelId);
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
    );

    if (!searchResponse.ok) {
      throw new Error(`Video search failed: ${await searchResponse.text()}`);
    }

    const searchData = await searchResponse.json();
    console.log('Found videos:', searchData.items?.length || 0);

    if (!searchData.items || searchData.items.length === 0) {
      console.error('No videos found in search response');
      throw new Error('No videos found in channel');
    }

    // Get video details in batches of 50
    const videoIds = searchData.items.map((item: any) => item.id.videoId);
    const videos = [];

    for (let i = 0; i < videoIds.length; i += 50) {
      const batchIds = videoIds.slice(i, i + 50).join(',');
      console.log(`Fetching details for videos ${i + 1}-${i + 50}`);
      
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${batchIds}&part=contentDetails,statistics,snippet`
      );

      if (!detailsResponse.ok) {
        throw new Error(`Video details failed: ${await detailsResponse.text()}`);
      }

      const detailsData = await detailsResponse.json();
      
      videos.push(...detailsData.items.map((details: any) => {
        const searchItem = searchData.items.find((item: any) => item.id.videoId === details.id);
        const video = {
          id: details.id,
          title: details.snippet.title,
          description: details.snippet.description,
          thumbnail: details.snippet.thumbnails.high?.url || details.snippet.thumbnails.medium?.url || details.snippet.thumbnails.default?.url,
          category: getCategoryFromTitle(details.snippet.title),
          views: formatViews(details.statistics.viewCount),
          duration: getVideoDuration(details.contentDetails.duration),
          date: formatDate(details.snippet.publishedAt)
        };
        console.log(`Processed video: ${video.title}`);
        return video;
      }));
    }

    console.log('Successfully processed videos:', videos.length);

    // Update cache
    videoCache = {
      data: videos,
      timestamp: now,
      CACHE_DURATION: videoCache.CACHE_DURATION
    };

    return videos.slice(0, maxResults);

  } catch (error) {
    console.error('Error in getYouTubeVideos:', error);
    // Return cached data if available, even if expired
    if (videoCache.data) {
      console.log('Returning expired cache data due to error');
      return videoCache.data.slice(0, maxResults);
    }
    throw error;
  }
}

function getCategoryFromTitle(title: string): string {
  title = title.toLowerCase();
  if (title.includes('pod') || title.includes('podcast')) return 'podcast';
  if (title.includes('society')) return 'society';
  if (title.includes('business')) return 'business';
  if (title.includes('relationship')) return 'relationships';
  if (title.includes('conspiracy')) return 'conspiracy';
  return 'other';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function formatViews(viewCount: string): string {
  const count = parseInt(viewCount);
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return viewCount;
}