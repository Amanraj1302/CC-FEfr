export function getYouTubeEmbedUrl(url: string, autoplay = false): string {
  let videoId = "";

  if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1]?.split("?")[0];
  }

  if (!videoId) return "";

  let baseUrl = `https://www.youtube.com/embed/${videoId}`;
  let params = [`mute=1`, `loop=1`, `playlist=${videoId}`];
  if (autoplay) params.unshift("autoplay=1");

  return `${baseUrl}?${params.join("&")}`;
}
