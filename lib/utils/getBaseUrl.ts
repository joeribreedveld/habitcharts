export function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? "https://habitcharts.vercel.app"
    : "http://localhost:3000";
}
