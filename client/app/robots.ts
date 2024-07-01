import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (!process.env.NEXT_PUBLIC_NEXTJS_HOST) {
    throw new Error("NEXT_PUBLIC_NEXTJS_HOST is not defined");
  }

  const nextjsURL = new URL(process.env.NEXT_PUBLIC_NEXTJS_HOST);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/reader/*"
      ]
    },
    sitemap: `https://${nextjsURL.hostname}/data/sitemap-index.xml`,
  };
}
