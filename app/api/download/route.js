import ytdl from "ytdl-core";
import { Innertube } from "youtubei.js";

export async function POST(request) {
  const { url } = await request.json();

  try {
    // Validate URL
    if (!ytdl.validateURL(url) && !url.includes("youtube.com/shorts/")) {
      return Response.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // Extract video ID differently for Shorts vs regular videos
    let videoId;
    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1].split("?")[0];
    } else {
      videoId = ytdl.getURLVideoID(url);
    }

    // Use youtubei.js as fallback if ytdl-core fails
    let info;
    try {
      info = await ytdl.getInfo(videoId);
    } catch (ytdlError) {
      console.log("Falling back to youtubei.js");
      const youtube = await Innertube.create();
      info = await youtube.getInfo(videoId);
    }

    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    // Thumbnails
    const thumbnails = [
      {
        quality: "Max",
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      },
      {
        quality: "High",
        url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      },
      {
        quality: "Medium",
        url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      },
      {
        quality: "Standard",
        url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      },
    ].filter((thumb) => thumb.url);

    // Video formats
    const videoFormats = info.formats
      .filter((format) => format.hasVideo && format.hasAudio)
      .sort((a, b) => b.height - a.height)
      .map((format) => ({
        quality: `${format.qualityLabel || `${format.height}p`}`,
        format: format.container,
        url: `/api/stream?videoId=${videoId}&itag=${
          format.itag
        }&title=${encodeURIComponent(title)}&type=video`,
        filename: `${title}-${format.qualityLabel || format.height}p.${
          format.container
        }`,
      }));

    // Audio format
    const audioFormat = info.formats.find(
      (format) =>
        format.hasAudio && !format.hasVideo && format.container === "mp4"
    );

    const audioUrl = audioFormat
      ? {
          quality: "128kbps",
          url: `/api/stream?videoId=${videoId}&itag=${
            audioFormat.itag
          }&title=${encodeURIComponent(title)}&type=audio`,
          filename: `${title}.mp3`,
        }
      : null;

    return Response.json({
      title: info.videoDetails.title,
      thumbnails,
      audio: audioUrl,
      videos: videoFormats,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      {
        error: "Failed to process video",
        details: error.message,
        solution: "Try again later or use a different video",
      },
      { status: 500 }
    );
  }
}
