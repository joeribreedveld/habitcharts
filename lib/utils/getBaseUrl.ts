export function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? process.env.VERCEL_URL
    : "http://localhost:3000";
}
