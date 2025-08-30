import ytdl from "ytdl-core";
import { NextResponse } from "next/server";
import { unlinkSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegStatic);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  const itag = searchParams.get("itag");
  const title = searchParams.get("title");
  const type = searchParams.get("type");

  if (!videoId || !itag || !title || !type) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    // Create temp directory if it doesn't exist
    const tempDir = join(process.cwd(), "temp");
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir);
    }

    const tempFilePath = join(tempDir, `${videoId}-${itag}.tmp`);

    // Set appropriate headers based on type
    const headers = new Headers();
    let filename = title;

    if (type === "audio") {
      headers.set("Content-Type", "audio/mpeg");
      if (!filename.endsWith(".mp3")) filename += ".mp3";
    } else {
      headers.set("Content-Type", "video/mp4");
      if (!filename.endsWith(".mp4")) filename += ".mp4";
    }

    headers.set("Content-Disposition", `attachment; filename="${filename}"`);

    // For audio, we need to convert to mp3
    if (type === "audio") {
      const audioWriteStream = ytdl(
        `https://www.youtube.com/watch?v=${videoId}`,
        { quality: itag }
      ).pipe(writeFileSync(tempFilePath));

      await new Promise((resolve, reject) => {
        ffmpeg(tempFilePath)
          .audioBitrate(128)
          .toFormat("mp3")
          .on("error", reject)
          .on("end", () => {
            unlinkSync(tempFilePath); // Clean up temp file
            resolve();
          })
          .save(tempFilePath);
      });
    }

    // Create a stream from the file
    const fileStream = createReadStream(tempFilePath);

    // Clean up after streaming
    fileStream.on("end", () => {
      try {
        unlinkSync(tempFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    });

    return new NextResponse(fileStream, { headers });
  } catch (error) {
    console.error("Stream error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
