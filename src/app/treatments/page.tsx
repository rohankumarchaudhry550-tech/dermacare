"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Calendar, Sparkles, Filter } from "lucide-react";
import treatmentsData from "@/data/treatments.json";
import { useAppointment } from "@/context/AppointmentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function TreatmentsPage() {
  const { openModal } = useAppointment();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(treatmentsData.map((t) => t.category)))];

  const filteredTreatments = treatmentsData.filter((treatment) => {
    const matchesSearch =
      treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || treatment.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen py-16 px-6">
      {/* Background radial highlights */}
      <div className="absolute top-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Clinical Specialties")}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins">
            {t("Treatments & Clinical Services")}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            {t("Explore our FDA-approved clinical procedures, advanced laser technologies, and medical-grade aesthetic treatments tailored by Dr. Aryan Sharma.")}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-3xl border border-accent/30 shadow-luxury space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("Search treatments (e.g., acne, laser, PRP, filler...)")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50"
              />
            </div>
            
            {/* Filter label for desktop */}
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

        {/* Treatments Grid */}
        <div>
          {filteredTreatments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreatments.map((treatment) => (
                <div
                  key={treatment.slug}
                  className="bg-white rounded-3xl p-6 border border-accent/20 hover:border-primary/25 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-accent/45 px-2.5 py-0.5 rounded-full block">
                        {t(treatment.category)}
                      </span>
                      <Sparkles className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">
                      {t(treatment.title)}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {t(treatment.shortDescription)}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-accent/15 mt-6 flex justify-between items-center">
                    <button
                      onClick={openModal}
                      className="text-[10px] font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      {t("Book Consultation")}
                    </button>
                    <Link
                      href={`/treatments/${treatment.slug}`}
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
              <h3 className="font-poppins font-bold text-slate-800 text-lg">{t("No treatments found")}</h3>
              <p className="text-slate-500 text-xs mt-1">{t("Try adjusting your filters or search keywords.")}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 px-5 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient shadow cursor-pointer"
              >
                {t("Clear Search & Filters")}
              </button>
            </div>
          )}
        </div>

        {/* Global CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-luxury">
          <div className="space-y-3 text-left max-w-lg">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">{t("Personalized Care") || t("Clinic values")}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white">{t("Not sure which treatment fits you?")}</h2>
            <p className="text-teal-55 text-xs leading-relaxed">
              {t("Schedule a comprehensive digital skin analysis consultation. Our specialists will diagnose your conditions and draft a customized clinical layout.")}
            </p>
          </div>
          <button
            onClick={openModal}
            className="px-8 py-4 rounded-full font-bold text-sm bg-white text-primary hover:bg-accent transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
          >
            {t("Schedule Consultation") || t("Book Appointment")} <Calendar className="h-4 w-4" />
          </button>
        </section>
      </div>
    </div>
  );
}
