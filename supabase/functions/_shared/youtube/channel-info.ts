// @ts-nocheck

export async function fetchChannelInfo(channelId: string) {
  const apiKey = Deno.env.get("YOUTUBE_API_KEY");
  if (!apiKey) throw new Error("YOUTUBE_API_KEY missing in Deno env");

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
  );

  const json = await res.json();
  const item = json.items?.[0];
  if (!item) return null;

  return {
    subscribers: Number(item.statistics.subscriberCount),
    views: Number(item.statistics.viewCount),
    videos: Number(item.statistics.videoCount),
  };
}
