import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, platform } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Detect platform if not provided
    const detectedPlatform = platform || detectPlatform(url);
    
    switch (detectedPlatform) {
      case 'youtube':
        return await handleYouTube(url);
      case 'instagram':
        return await handleInstagram(url);
      case 'facebook':
        return await handleFacebook(url);
      case 'tiktok':
        return await handleTikTok(url);
      case 'twitter':
        return await handleTwitter(url);
      default:
        return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
    }
  } catch (error) {
    console.error('Download API Error:', error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}

function detectPlatform(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  return 'youtube';
}

async function handleYouTube(url) {
  try {
    // Extract video ID
    let videoId;
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
    } else {
      const match = url.match(/[?&]v=([^&]+)/);
      videoId = match ? match[1] : null;
    }

    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Use yt-dlp or similar service (this is a mock implementation)
    const mockData = {
      title: "Sample YouTube Video",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: "5:30",
      author: "Sample Channel",
      views: "1.2M views",
      platform: "youtube",
      formats: [
        { quality: "1080p", format: "MP4", size: "45.2 MB", type: "video", downloadUrl: `/api/stream?id=${videoId}&quality=1080` },
        { quality: "720p", format: "MP4", size: "28.1 MB", type: "video", downloadUrl: `/api/stream?id=${videoId}&quality=720` },
        { quality: "480p", format: "MP4", size: "18.5 MB", type: "video", downloadUrl: `/api/stream?id=${videoId}&quality=480` },
        { quality: "Audio Only", format: "MP3", size: "3.2 MB", type: "audio", downloadUrl: `/api/stream?id=${videoId}&quality=audio` },
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    throw new Error(`YouTube processing failed: ${error.message}`);
  }
}

async function handleInstagram(url) {
  try {
    // Extract post ID from Instagram URL
    const postMatch = url.match(/\/p\/([A-Za-z0-9_-]+)/);
    const reelMatch = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    const storyMatch = url.match(/\/stories\/([^\/]+)\/([0-9]+)/);
    
    const postId = postMatch?.[1] || reelMatch?.[1] || storyMatch?.[2];
    
    if (!postId) {
      throw new Error('Invalid Instagram URL');
    }

    // Mock Instagram data
    const mockData = {
      title: "Instagram Post/Reel",
      thumbnail: `https://picsum.photos/400/400?random=${postId}`,
      duration: "0:30",
      author: "@sample_user",
      views: "50K likes",
      platform: "instagram",
      formats: [
        { quality: "Original", format: "MP4", size: "12.3 MB", type: "video", downloadUrl: `/api/stream?platform=instagram&id=${postId}&quality=original` },
        { quality: "High Quality", format: "JPG", size: "2.1 MB", type: "image", downloadUrl: `/api/stream?platform=instagram&id=${postId}&quality=image` },
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    throw new Error(`Instagram processing failed: ${error.message}`);
  }
}

async function handleFacebook(url) {
  try {
    // Extract video ID from Facebook URL
    const videoMatch = url.match(/\/videos\/([0-9]+)/);
    const watchMatch = url.match(/\/watch\/\?v=([0-9]+)/);
    const fbWatchMatch = url.match(/fb\.watch\/([A-Za-z0-9_-]+)/);
    
    const videoId = videoMatch?.[1] || watchMatch?.[1] || fbWatchMatch?.[1];
    
    if (!videoId) {
      throw new Error('Invalid Facebook URL');
    }

    const mockData = {
      title: "Facebook Video",
      thumbnail: `https://picsum.photos/400/300?random=${videoId}`,
      duration: "3:45",
      author: "Sample Page",
      views: "25K views",
      platform: "facebook",
      formats: [
        { quality: "HD", format: "MP4", size: "35.7 MB", type: "video", downloadUrl: `/api/stream?platform=facebook&id=${videoId}&quality=hd` },
        { quality: "SD", format: "MP4", size: "18.9 MB", type: "video", downloadUrl: `/api/stream?platform=facebook&id=${videoId}&quality=sd` },
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    throw new Error(`Facebook processing failed: ${error.message}`);
  }
}

async function handleTikTok(url) {
  try {
    // Extract video ID from TikTok URL
    const videoMatch = url.match(/\/video\/([0-9]+)/);
    const userMatch = url.match(/\/@([^\/]+)\/video\/([0-9]+)/);
    
    const videoId = videoMatch?.[1] || userMatch?.[2];
    
    if (!videoId) {
      throw new Error('Invalid TikTok URL');
    }

    const mockData = {
      title: "TikTok Video",
      thumbnail: `https://picsum.photos/300/400?random=${videoId}`,
      duration: "0:15",
      author: "@sample_tiktoker",
      views: "100K views",
      platform: "tiktok",
      formats: [
        { quality: "Original", format: "MP4", size: "8.5 MB", type: "video", downloadUrl: `/api/stream?platform=tiktok&id=${videoId}&quality=original` },
        { quality: "No Watermark", format: "MP4", size: "8.1 MB", type: "video", downloadUrl: `/api/stream?platform=tiktok&id=${videoId}&quality=nowatermark` },
        { quality: "Audio Only", format: "MP3", size: "1.2 MB", type: "audio", downloadUrl: `/api/stream?platform=tiktok&id=${videoId}&quality=audio` },
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    throw new Error(`TikTok processing failed: ${error.message}`);
  }
}

async function handleTwitter(url) {
  try {
    // Extract tweet ID from Twitter URL
    const tweetMatch = url.match(/\/status\/([0-9]+)/);
    const tweetId = tweetMatch?.[1];
    
    if (!tweetId) {
      throw new Error('Invalid Twitter URL');
    }

    const mockData = {
      title: "Twitter Video",
      thumbnail: `https://picsum.photos/400/300?random=${tweetId}`,
      duration: "1:20",
      author: "@sample_user",
      views: "5K retweets",
      platform: "twitter",
      formats: [
        { quality: "720p", format: "MP4", size: "15.3 MB", type: "video", downloadUrl: `/api/stream?platform=twitter&id=${tweetId}&quality=720` },
        { quality: "480p", format: "MP4", size: "8.7 MB", type: "video", downloadUrl: `/api/stream?platform=twitter&id=${tweetId}&quality=480` },
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    throw new Error(`Twitter processing failed: ${error.message}`);
  }
}
