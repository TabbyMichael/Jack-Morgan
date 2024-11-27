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
      return videoCache.data.slice(0, maxResults);
    }

    // If no cached data or cache expired, fetch from API
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    
    if (!channelId) {
      throw new Error('YouTube channel ID not configured');
    }

    // Get videos using the channel ID (single API call)
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
    );

    if (!searchResponse.ok) {
      throw new Error(`Video search failed: ${await searchResponse.text()}`);
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      throw new Error('No videos found');
    }

    // Get video details in batches of 50 (YouTube API limit)
    const videoIds = searchData.items.map((item: any) => item.id.videoId);
    const videos = [];
    
    for (let i = 0; i < videoIds.length; i += 50) {
      const batchIds = videoIds.slice(i, i + 50).join(',');
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&id=${batchIds}&part=contentDetails,statistics,snippet`
      );

      if (!detailsResponse.ok) {
        throw new Error(`Video details failed: ${await detailsResponse.text()}`);
      }

      const detailsData = await detailsResponse.json();

      videos.push(...detailsData.items.map((details: any) => {
        const searchItem = searchData.items.find((item: any) => item.id.videoId === details.id);
        return {
          id: details.id,
          title: details.snippet.title,
          description: details.snippet.description,
          thumbnail: details.snippet.thumbnails.high.url,
          category: getCategoryFromTitle(details.snippet.title),
          views: formatViews(details.statistics.viewCount),
          duration: getVideoDuration(details.contentDetails.duration),
          date: formatDate(details.snippet.publishedAt)
        };
      }));
    }

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