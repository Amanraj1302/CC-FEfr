 export function getYouTubeEmbedUrl(url: string): string {
  let videoId = "";

  if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1]?.split("?")[0];
  }

  return videoId
    ? `https://www.youtube.com/embed/${videoId}?mute=1&loop=1&playlist=${videoId}`
    : "";
}
