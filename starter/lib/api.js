export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  // Add /api prefix if missing
  const apiPath = path.startsWith("/api") ? path : `/api${path}`
  const requestUrl = getStrapiURL(apiPath)
  const response = await fetch(requestUrl)
  
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please check your API: ${response.statusText}`)
  }

  const responseData = await response.json()
  // Strapi 5 wraps the actual content in a 'data' property
  return responseData.data || responseData
}

