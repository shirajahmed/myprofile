// app/api/check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();
  const platformsParam = searchParams.get("platforms");
  if (!username)
    return NextResponse.json({ error: "No username" }, { status: 400 });



  const platforms = {
    instagram: `https://www.instagram.com/${username}`,
    linkedin: `https://www.linkedin.com/in/${username}`,
    facebook: `https://www.facebook.com/${username}`,
    youtube: `https://www.youtube.com/@${username}`,
    github: `https://github.com/${username}`,
    x: `https://x.com/${username}`,
    google: `https://gmail.com/${username}`, // placeholder: Gmail doesn't use this
  } as const; // 'as const' makes the object keys literal types

  type PlatformKey = keyof typeof platforms;

  const platformsToCheck: PlatformKey[] = platformsParam
    ? (platformsParam.split(",") as PlatformKey[])
    : [];

  const results: Record<string, string> = {};

  await Promise.all(
    platformsToCheck.map(async (platform) => {
      const url = platforms[platform];
      if (!url) {
        results[platform] = "unknown";
        return;
      }
      try {
        let res;
        if (platform === "x") {
          // Use GET request for X (Twitter)
          res = await fetch(url, { method: "GET", redirect: "manual" });
          const text = await res.text();
          // Check if the response contains a specific string indicating the user does not exist
          results[platform] = text.includes("Sorry, that page doesn’t exist!")
            ? "available"
            : "taken";
        } else {
          // Use HEAD request for other platforms
          res = await fetch(url, { method: "HEAD", redirect: "manual" });
          results[platform] = res.status === 404 ? "available" : "taken";
        }
      } catch {
        results[platform] = "error";
      }
    })
  );

  return NextResponse.json(results);
}
