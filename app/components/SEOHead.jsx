import Head from 'next/head';

export default function SEOHead({ 
  title = "Shiraj Ahmed - Frontend Developer Portfolio",
  description = "Frontend Developer specializing in React, Next.js, and modern web technologies",
  keywords = "",
  image = "/shirajahmed.png",
  url = "https://shirajahmed.com"
}) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Shiraj Ahmed" />
      <link rel="canonical" href={url} />
    </Head>
  );
}
