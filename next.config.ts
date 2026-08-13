import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This landing page has no server routes or database calls. Exporting it as
  // static files makes it deployable on Vercel (and any static host).
  output: "export",
};

export default nextConfig;
