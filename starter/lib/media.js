import { getStrapiURL } from "./api"

export function getStrapiMedia(media) {
  if (!media || !media.url) {
    return null;
  }
  console.log(media, "media", media.url.startsWith("/"));

  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url
  return imageUrl
}

