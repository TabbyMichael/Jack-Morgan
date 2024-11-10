import { formatDuration } from "date-fns";

export function getVideoDuration(duration: string) {
  // Convert ISO 8601 duration to readable format
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

export async function getYouTubeVideos(maxResults = 9) {
  try {
    // First, get the channel ID using the username
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&forUsername=JackMorgan_RLP&part=id,snippet`
    );

    if (!channelResponse.ok) {
      throw new Error(`Channel API failed: ${await channelResponse.text()}`);
    }

    const channelData = await channelResponse.json();
    console.log('Channel Data:', channelData);

    // If no channel found by username, try with custom URL
    let channelId;
    if (channelData.items && channelData.items.length > 0) {
      channelId = channelData.items[0].id;
    } else {
      // Try getting channel by custom URL
      const customUrlResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&q=JackMorgan_RLP&type=channel&part=id,snippet`
      );
      
      if (!customUrlResponse.ok) {
        throw new Error(`Custom URL search failed: ${await customUrlResponse.text()}`);
      }

      const customUrlData = await customUrlResponse.json();
      console.log('Custom URL Search Data:', customUrlData);

      if (!customUrlData.items || customUrlData.items.length === 0) {
        throw new Error('Could not find channel ID');
      }

      channelId = customUrlData.items[0].id.channelId;
    }

    console.log('Found Channel ID:', channelId);

    // Get videos using the found channel ID
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
    );

    if (!response.ok) {
      throw new Error(`Video search failed: ${await response.text()}`);
    }

    const searchData = await response.json();
    console.log('Video Search Data:', searchData);

    if (!searchData.items || searchData.items.length === 0) {
      throw new Error('No videos found in search response');
    }

    // Get video details
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`
    );

    if (!detailsResponse.ok) {
      throw new Error(`Video details failed: ${await detailsResponse.text()}`);
    }

    const detailsData = await detailsResponse.json();
    console.log('Video Details Data:', detailsData);

    return searchData.items.map((item: any, index: number) => {
      const details = detailsData.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        category: getCategoryFromTitle(item.snippet.title),
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        duration: getVideoDuration(details.contentDetails.duration),
        date: formatDate(item.snippet.publishedAt),
        views: formatViews(details.statistics.viewCount)
      };
    });

  } catch (error) {
    console.error('Error in getYouTubeVideos:', error);
    throw error; // Re-throw to be handled by the component
  }
}

// Update categories to match Jack's content
function getCategoryFromTitle(title: string): string {
  title = title.toLowerCase();
  if (title.includes('red leather pod') || title.includes('rlp')) return 'podcast';
  if (title.includes('society') || title.includes('civilization') || title.includes('western')) return 'society';
  if (title.includes('business') || title.includes('economy') || title.includes('money')) return 'business';
  if (title.includes('dating') || title.includes('relationships')) return 'relationships';
  if (title.includes('conspiracy') || title.includes('aliens')) return 'conspiracy';
  return 'other';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function formatViews(viewCount: string): string {
  const count = parseInt(viewCount);
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return viewCount;
}

// Add this to your environment variables (.env.local):
// NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here s
// NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id_here