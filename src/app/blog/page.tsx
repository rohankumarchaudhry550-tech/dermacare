"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, Mail, Sparkles, Check } from "lucide-react";
import blogData from "@/data/blog.json";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const categories = ["All", ...Array.from(new Set(blogData.map((b) => b.category)))];

  const filteredBlogs = blogData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-6">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/25 blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Medical Education")}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins">
            {t("Clinical Insights & Care Guides")}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            {t("Dermatologist-authored guides on skin health, hair rejuvenation, laser safety, and modern anti-aging options.")}
          </p>
        </div>

        {/* Search & Newsletter section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Search box & Categories */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-accent/30 shadow-luxury flex flex-col justify-between gap-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("Search articles (e.g., sunscreen, skin barrier, retinol, GFC...)")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t("Browse Categories:")}</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-accent/40 text-primary-dark hover:bg-accent/60"
                    }`}
                  >
                    {cat === "All" ? t("All Services") : t(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 bg-slate-900 text-slate-350 p-6 rounded-3xl border border-slate-850 flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-poppins font-bold text-sm text-white flex items-center gap-1.5">
                <Mail className="h-4.5 w-4.5 text-secondary" /> {t("Subscribe to Updates")}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t("Receive monthly clinical advice, laser guidelines, and exclusive invitations to patient seminars.")}
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                placeholder={t("Your email address")}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-primary text-xs text-white placeholder-slate-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white btn-gradient flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                {newsletterSuccess ? (
                  <>
                    <Check className="h-4 w-4" /> {t("Subscribed")}
                  </>
                ) : (
                  t("Subscribe Now")
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Blog Grid */}
        <div>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((post) => (
                <div
                  key={post.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-accent/20 flex flex-col justify-between shadow-sm hover:shadow-luxury transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-[10px] text-secondary font-bold uppercase tracking-wider">
                      <span>{t(post.category)}</span>
                      <span>{t(post.readTime) || post.readTime}</span>
                    </div>
                    <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-850 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{t(post.title)}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {t(post.excerpt)}
                    </p>
                  </div>

                  <div className="p-6 border-t border-accent/10 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold">
                        AS
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold">{t(post.author)}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="h-8 w-8 rounded-full bg-white border border-accent/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <h3 className="font-poppins font-bold text-slate-800 text-lg">{t("No matching medical articles")}</h3>
              <p className="text-slate-500 text-xs mt-1">{t("Try resetting filters or searching with alternative dermatological keywords.")}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 px-5 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient shadow cursor-pointer"
              >
                {t("Reset Search")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
