import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://thekalesh.com";

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = "https://thekalesh.com/og-image.jpg",
  twitterTitle,
  twitterDescription,
  twitterImage = "https://thekalesh.com/og-image.jpg",
  schemaType = "WebPage",
  article = null,
  breadcrumbs = null,
  faq = null
}) {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname}`;

  // Generate Schema.org structured data
  const generateSchema = () => {
    const schemas = [];

    // Base WebSite/WebPage schema
    if (schemaType === "WebPage" || schemaType === "WebSite") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": title,
        "url": canonicalUrl,
        "description": description,
        "inLanguage": "en-IN",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Kalesh",
          "url": SITE_URL
        }
      });
    }

    // Article schema for blog posts
    if (article) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.headline || title,
        "description": description,
        "image": article.image || ogImage,
        "author": {
          "@type": "Organization",
          "name": "Kalesh",
          "url": SITE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": "Kalesh",
          "url": SITE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": "https://thekalesh.com/logo.png"
          }
        },
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      });
    }

    // Breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": `${SITE_URL}${crumb.path}`
        }))
      });
    }

    // FAQ schema
    if (faq && faq.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      });
    }

    return schemas;
  };

  const schemas = generateSchema();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Article specific OG tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.datePublished} />
          <meta property="article:modified_time" content={article.dateModified || article.datePublished} />
          <meta property="article:author" content="Kalesh" />
          <meta property="article:section" content={article.section || "Social Media"} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KaleshThe76740" />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}