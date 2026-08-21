import React, { useEffect } from "react";

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://thekalesh.com/images/kalesh-og-banner.png",
  ogType = "website",
  author = "DIMISI TECHNOLOGIES PVT LTD",
  twitterHandle = "@thekalesh",
  keywords = "Kalesh, Kalesh Team, Anonymous Polling, Live Polls, Gen-Z Social App, DIMISI TECHNOLOGIES",
  schemaJson,
}) => {
  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // Helper to safely set/update meta tags
    const setMeta = (attr, key, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Search Engine Meta
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("name", "author", author);
    setMeta("name", "publisher", "DIMISI TECHNOLOGIES PVT LTD");
    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMeta("name", "theme-color", "#000000");

    // 3. Open Graph (Facebook, WhatsApp, LinkedIn, Discord)
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:site_name", "Kalesh");
    setMeta("property", "og:locale", "en_IN");

    // 4. Twitter / X Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", twitterHandle);
    setMeta("name", "twitter:creator", twitterHandle);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", title);

    // 5. Canonical Link
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    // 6. JSON-LD Schema (Search & AI Knowledge Graph)
    let scriptTag = document.getElementById("kalesh-schema-jsonld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "kalesh-schema-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    if (schemaJson) {
      scriptTag.textContent = JSON.stringify(schemaJson);
    }

    // Cleanup on unmount / route change
    return () => {
      if (scriptTag) {
        scriptTag.textContent = "";
      }
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    author,
    twitterHandle,
    keywords,
    schemaJson,
  ]);

  return null;
};

export default SEOHead;
