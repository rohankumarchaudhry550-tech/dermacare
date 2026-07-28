import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";
import BlogDetailClient from "@/components/BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogData.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogData.find((b) => b.slug === slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | DermaCare+ Blog`,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = blogData.find((b) => b.slug === slug);

  if (!article) {
    notFound();
  }

  // Find related articles
  const relatedArticlesData = blogData.filter((b) =>
    article.relatedArticles.includes(b.slug)
  );

  // Schema: Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.dermacareplus.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.dermacareplus.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://www.dermacareplus.com/blog/${article.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetailClient article={article} relatedArticles={relatedArticlesData} />
    </>
  );
}
