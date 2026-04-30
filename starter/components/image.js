import { getStrapiMedia } from "../lib/media"
import NextImage from "next/image"

const Image = ({ image }) => {
  if (!image) {
    return null;
  }
  const { alternativeText } = image
  const fullUrl = getStrapiMedia(image)

  return (
    <img
      src={fullUrl}
      alt={alternativeText || ""}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        objectFit: 'cover'
      }}
    />
  )
}

export default Image

