"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, HeartPulse, Filter } from "lucide-react";
import conditionsData from "@/data/conditions.json";
import { useLanguage } from "@/context/LanguageContext";

export default function ConditionsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(conditionsData.map((c) => c.category)))];

  const filteredConditions = conditionsData.filter((condition) => {
    const matchesSearch =
      condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      condition.doctorAdvice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      condition.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || condition.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen py-16 px-6">
      {/* Background gradients */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent/25 blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Clinical Information")}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins">
            {t("Skin & Hair Conditions Center")}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            {t("A comprehensive, dermatologist-verified educational resource helping you identify symptoms, understand causes, and explore clinical treatment options.")}
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-white p-6 rounded-3xl border border-accent/30 shadow-luxury space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("Search skin/hair conditions (e.g., eczema, alopecia, dandruff...)")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50"
              />
            </div>
            
            <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">
              <Filter className="h-4 w-4" /> {t("Filter Categories")}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
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

        {/* Conditions Grid */}
        <div>
          {filteredConditions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConditions.map((condition) => (
                <div
                  key={condition.slug}
                  className="bg-white rounded-3xl p-6 border border-accent/25 hover:border-primary/25 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-accent/45 px-2.5 py-0.5 rounded-full block">
                        {t(condition.category)} {t("Category")}
                      </span>
                      <BookOpen className="h-4 w-4 text-slate-350 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">
                      {t(condition.name)}
                    </h3>
                    
                    {/* Symptoms Snippet */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t("Key Indicators:")}</span>
                      <div className="flex flex-wrap gap-1">
                        {condition.symptoms.slice(0, 2).map((s, idx) => (
                          <span key={idx} className="text-[10px] text-slate-650 bg-slate-100 px-2 py-0.5 rounded">
                            {t(s)}
                          </span>
                        ))}
                        {condition.symptoms.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-semibold pl-1">+{condition.symptoms.length - 2} {t("of")} {t("more") || "more"}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-2">
                      <strong>{t("Doctor's Advice:")}</strong> {t(condition.doctorAdvice)}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-accent/15 mt-6 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{t("Educational Guide")}</span>
                    <Link
                      href={`/conditions/${condition.slug}`}
                      className="h-8 w-8 rounded-full bg-slate-50 border border-accent/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <h3 className="font-poppins font-bold text-slate-800 text-lg">{t("No conditions matched your search")}</h3>
              <p className="text-slate-500 text-xs mt-1">{t("Try searching for other terms or checking alternative spellings.")}</p>
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

        {/* Disclaimer Note */}
        <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl max-w-3xl mx-auto flex gap-3 items-start">
          <HeartPulse className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-600 leading-relaxed">
            <strong>{t("Medical Disclaimer:") || t("Medical Disclaimer")}</strong> {t("The information provided in this knowledge center is purely for educational purposes and should not be used as a self-diagnosis guide. Please schedule a clinical consultation with Dr. Aryan Sharma to receive accurate diagnosis and tailored pharmaceutical treatments.")}
          </p>
        </div>
      </div>
    </div>
  );
}
