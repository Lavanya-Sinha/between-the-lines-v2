export const getResourceType = (mimeType) => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType.startsWith("audio/")) {
    return "video";
  }

  return "raw";
};