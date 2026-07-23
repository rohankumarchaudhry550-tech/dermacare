import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles } from "lucide-react";
import blogData from "@/data/blog.json";

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

      <div className="relative min-h-screen py-10 px-6">
        {/* Background elements */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium line-clamp-1">{article.title}</span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Medical Blog
          </Link>

          {/* Reading Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Article Reading */}
            <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-luxury space-y-6">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-secondary uppercase tracking-wider">
                <span className="bg-accent/40 px-3 py-1 rounded-full">{article.category}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {article.readTime}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.publishDate}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-poppins leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-slate-550 text-xs sm:text-sm font-medium leading-relaxed border-l-4 border-secondary pl-4 py-1.5 italic bg-slate-50">
                {article.excerpt}
              </p>

              {/* Article Content - Rendering paragraph structure beautifully */}
              <div className="text-slate-650 text-xs sm:text-sm leading-relaxed space-y-6 pt-4 border-t border-slate-100 font-inter">
                {article.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Share & Social Action buttons */}
              <div className="pt-8 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <span className="font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="h-4 w-4" /> Share This Medical Guide:
                </span>
                <div className="flex gap-2">
                  <button className="h-8 px-4 rounded-full border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 text-slate-650 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg> Facebook
                  </button>
                  <button className="h-8 px-4 rounded-full border border-slate-200 hover:border-sky-400 hover:bg-sky-50/20 text-slate-650 hover:text-sky-500 transition-colors flex items-center gap-1.5 cursor-pointer">
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> Twitter
                  </button>
                  <button className="h-8 px-4 rounded-full border border-slate-200 hover:border-blue-700 hover:bg-blue-50/20 text-slate-650 hover:text-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer">
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
                  </button>
                </div>
              </div>
            </article>

            {/* Right Side: Sticky Author Info & Related Articles */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              {/* Author Card */}
              <div className="bg-slate-900 text-slate-350 rounded-3xl p-6 border border-slate-850 space-y-4">
                <span className="text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/15 px-2 py-0.5 rounded-full inline-block">
                  About the Author
                </span>
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-xs shrink-0">
                    AS
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-white text-xs sm:text-sm">{article.author}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">MD - AIIMS | Senior Dermatologist</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                  Dr. Aryan Sharma is committed to providing evidence-based healthcare education, resolving patient doubts via verified journals.
                </p>
              </div>

              {/* Related Articles listing */}
              {relatedArticlesData.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-accent/30 shadow-luxury space-y-4">
                  <h3 className="font-poppins font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" /> Related Articles
                  </h3>
                  <div className="space-y-3">
                    {relatedArticlesData.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                      >
                        <h4 className="font-poppins font-semibold text-xs text-slate-850 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-[9px] text-secondary font-bold uppercase tracking-wider mt-1 block">
                          {post.category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
