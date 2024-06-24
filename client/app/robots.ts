import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (!process.env.NEXT_PUBLIC_BACKEND_HOST) {
    throw new Error("NEXT_PUBLIC_BACKEND_HOST is not defined");
  }

  const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND_HOST);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${backendUrl.hostname}/data/sitemap-index.xml`,
  };
}
