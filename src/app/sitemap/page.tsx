import React from "react";
import Link from "next/link";
import { ArrowLeft, Map } from "lucide-react";
import treatmentsData from "@/data/treatments.json";
import conditionsData from "@/data/conditions.json";
import blogData from "@/data/blog.json";

export default function SitemapPage() {
  const staticPages = [
    { name: "Home Page", path: "/" },
    { name: "About Dr. Aryan Sharma", path: "/about" },
    { name: "Treatments Catalog", path: "/treatments" },
    { name: "Conditions Index", path: "/conditions" },
    { name: "Gallery & Case Studies", path: "/gallery" },
    { name: "Verified Patient Reviews", path: "/reviews" },
    { name: "Educational Blog", path: "/blog" },
    { name: "Contact & Appointments", path: "/contact" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 space-y-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-accent/30 shadow-luxury space-y-8">
        <div className="flex items-center gap-2 text-primary">
          <Map className="h-8 w-8" />
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900">HTML Sitemap</h1>
        </div>
        
        <p className="text-xs text-slate-500 max-w-xl">
          Use our visual sitemap to navigate through our clinical treatments, hair solutions, laser guides, conditions catalog, and medical blog articles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-slate-100">
          {/* Static Pages */}
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-xs text-slate-800 uppercase tracking-wider border-b border-accent/30 pb-2">Main Pages</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {staticPages.map((page, i) => (
                <li key={i}>
                  <Link href={page.path} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="h-1 w-1 bg-secondary rounded-full" /> {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments dynamic */}
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-xs text-slate-800 uppercase tracking-wider border-b border-accent/30 pb-2">Treatments (22)</h3>
            <ul className="space-y-2 text-[11px] text-slate-600 max-h-64 overflow-y-auto pr-2">
              {treatmentsData.map((t) => (
                <li key={t.slug}>
                  <Link href={`/treatments/${t.slug}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="h-1 w-1 bg-primary rounded-full shrink-0" /> <span className="line-clamp-1">{t.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions dynamic */}
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-xs text-slate-800 uppercase tracking-wider border-b border-accent/30 pb-2">Conditions Center (20)</h3>
            <ul className="space-y-2 text-[11px] text-slate-600 max-h-64 overflow-y-auto pr-2">
              {conditionsData.map((c) => (
                <li key={c.slug}>
                  <Link href={`/conditions/${c.slug}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="h-1 w-1 bg-secondary rounded-full shrink-0" /> <span className="line-clamp-1">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog dynamic */}
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-xs text-slate-800 uppercase tracking-wider border-b border-accent/30 pb-2">Medical Blog (8)</h3>
            <ul className="space-y-2 text-[11px] text-slate-600 max-h-64 overflow-y-auto pr-2">
              {blogData.map((b) => (
                <li key={b.slug}>
                  <Link href={`/blog/${b.slug}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="h-1 w-1 bg-primary rounded-full shrink-0" /> <span className="line-clamp-1">{b.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
