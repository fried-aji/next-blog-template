import type { Metadata } from "next";

export const siteUrl = "https://example.com";

export const siteTitle = "Next.js テンプレート";

export const siteDescription = "これはNext.jsのテンプレートです。";

export const siteOgp: NonNullable<Metadata["openGraph"]> = {
  url: "/",
  images: [
    {
      url: "/opengraph-image.png",
      width: 1200,
      height: 600,
    },
  ],
  siteName: siteTitle,
  locale: "ja_JP",
  type: "website",
};
