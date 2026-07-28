"use client";

import React, { useState } from "react";
import { Sparkles, Image as ImageIcon, Film, Maximize2, X, AlertCircle } from "lucide-react";
import BeforeAfter from "@/components/ui/BeforeAfter";
import reviewsData from "@/data/reviews.json";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const categories = ["All", "Clinic Interior", "Advanced Equipment", "Patient Success"];

  const galleryItems = [
    {
      id: 1,
      category: "Clinic Interior",
      title: "Luxury Reception Lounge",
      description: "A calming, marble-themed luxury waiting space designed to offer premium patient hospitality.",
      svgBg: "from-teal-800 to-slate-900",
      accentPattern: "bg-[radial-gradient(#2f8f89_1px,transparent_1px)] [background-size:20px_20px] opacity-20",
      image: "/clinic-lounge.png"
    },
    {
      id: 2,
      category: "Clinic Interior",
      title: "Consultation Chamber",
      description: "Private, acoustically-insulated consulting rooms equipped with digital skin-dermoscopy devices.",
      svgBg: "from-slate-800 to-primary-dark",
      accentPattern: "bg-[linear-gradient(to_right,rgba(11,110,105,0.08)_1px,transparent_1px)] bg-[size:15px_15px] opacity-35",
      image: "/hero-consultation.png"
    },
    {
      id: 3,
      category: "Advanced Equipment",
      title: "Laser Resurfacing Theater",
      description: "US-FDA approved Fractional CO2 and Q-Switched laser setup for skin remodeling.",
      svgBg: "from-emerald-900 to-slate-900",
      accentPattern: "bg-[radial-gradient(#cfefea_1px,transparent_1px)] [background-size:16px_16px] opacity-15",
      image: "/laser-theater.png"
    },
    {
      id: 4,
      category: "Advanced Equipment",
      title: "Surgical Hair Transplant Suite",
      description: "Class-100 sterile environments utilizing microscopic graft cutters and bio-GFC extractors.",
      svgBg: "from-teal-900 to-primary-dark",
      accentPattern: "bg-[linear-gradient(to_bottom,rgba(47,143,137,0.1)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30",
      image: "/hair-transplant-suite.png"
    },
    {
      id: 5,
      category: "Clinic Interior",
      title: "Hydra Facial Therapy Room",
      description: "Bespoke cabins featuring soft ambient lighting and signature vortex extraction consoles.",
      svgBg: "from-slate-850 to-slate-950",
      accentPattern: "bg-[radial-gradient(#0b6e69_2px,transparent_2px)] [background-size:24px_24px] opacity-25",
      image: "/hydrafacial-room.png"
    },
    {
      id: 6,
      category: "Patient Success",
      title: "Scalp Trichoscopy Station",
      description: "High-resolution magnification monitors mapping follicle health and progress indicators.",
      svgBg: "from-primary-dark to-slate-900",
      accentPattern: "bg-[linear-gradient(45deg,rgba(11,110,105,0.06)_25%,transparent_25%)] bg-[size:20px_20px] opacity-40",
      image: "/glowing-skin.png"
    }
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="relative min-h-screen py-16 px-6">
      {/* Background blobs */}
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/25 blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Visual Showcase")}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins">
            {t("Clinic Gallery & Results")}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            {t("Take a visual tour through our state-of-the-art South Mumbai facility and review our interactive clinical before & after outcomes.")}
          </p>
        </div>

        {/* 1. Before & After Interactive Slider */}
        <section className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-accent/30 shadow-luxury space-y-8">
          <div className="max-w-xl text-left space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-4.5 w-4.5" /> {t("Interactive Demonstration")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins">{t("Clinical Case Study")}</h2>
            <p className="text-xs text-slate-500">
              {t("Drag the dividing bar to observe the resurfacing and scar remodeling results achieved by Dr. Aryan Sharma.")}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <BeforeAfter />
          </div>
        </section>

        {/* Featured Video Showcase */}
        <section className="bg-slate-900 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-luxury relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full inline-block">
                {t("Cinematic Showcase")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white leading-tight">
                {t("Walkthrough Our Premium Facility")}
              </h2>
              <p className="text-teal-55 text-xs sm:text-sm leading-relaxed">
                {t("Watch Dr. Aryan Sharma demonstrate our clinical protocols, laser theatres, and patient-first safety hygiene. Experience the premium care and luxury environment from your device.")}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-[10px] bg-white/5 border border-white/15 px-3 py-1.5 rounded-full text-slate-300">
                  ⚡ {t("FDA-Approved lasers")}
                </span>
                <span className="text-[10px] bg-white/5 border border-white/15 px-3 py-1.5 rounded-full text-slate-300">
                  🛡️ {t("Class-100 Sterile Zones")}
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative bg-slate-950">
                <video
                  src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02cba73e2185d9de28f99e4f5d50bde&profile_id=164&oauth2_token_id=57447761"
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Photo Gallery Showcase */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-5">
            <h2 className="text-2xl font-bold font-poppins text-slate-900 flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-primary" /> {t("Facility Interiors & Labs")}
            </h2>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
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

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item.id)}
                className="bg-white rounded-3xl border border-accent/20 overflow-hidden shadow-sm hover:shadow-luxury hover:border-secondary/35 transition-all duration-300 group cursor-pointer"
              >
                {/* Vector graphics or real image rendering */}
                <div className="h-56 relative overflow-hidden flex items-center justify-center bg-slate-900">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={t(item.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.svgBg}`} />
                      {/* Grid pattern overlay */}
                      <div className={`absolute inset-0 ${item.accentPattern}`} />
                      
                      {/* Subtle design elements mimicking room layouts */}
                      <div className="absolute w-20 h-20 rounded-full bg-accent/10 blur-xl top-1/4 left-1/4 animate-pulse-soft" />
                      <div className="absolute w-24 h-24 rounded-full bg-white/5 border border-white/10 top-1/3 right-1/3 flex items-center justify-center">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">DermaCare</span>
                      </div>
                    </>
                  )}

                  <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-900/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-6 space-y-2 bg-white">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-accent/40 px-2 py-0.5 rounded-full inline-block">
                    {t(item.category)}
                  </span>
                  <h3 className="font-poppins font-bold text-base text-slate-800 group-hover:text-primary transition-colors">
                    {t(item.title)}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {t(item.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Video Gallery Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold font-poppins text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-5">
            <Film className="h-6 w-6 text-primary" /> {t("Video Testimonials & Highlights")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsData.videoTestimonials.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-3xl border border-accent/20 overflow-hidden shadow-sm hover:shadow-luxury hover:border-secondary/35 transition-all duration-300"
              >
                {/* Video player */}
                <div className="aspect-video bg-slate-950 relative flex items-center justify-center overflow-hidden">
                  <video
                    src={vid.videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-poppins font-bold text-xs sm:text-sm text-slate-800">{t(vid.patientName)}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold">{t(vid.treatment)} {t("Review") || "Review"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal Overlay */}
      {selectedPhoto !== null && (() => {
        const item = galleryItems.find((p) => p.id === selectedPhoto);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            {/* Lightbox content */}
            <div className="relative w-full max-w-3xl bg-brand-bg rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center z-20 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-80 sm:h-[450px] relative overflow-hidden flex items-center justify-center bg-slate-900">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={t(item.title)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.svgBg}`} />
                    <div className={`absolute inset-0 ${item.accentPattern}`} />
                    <div className="absolute w-40 h-40 rounded-full bg-accent/5 blur-2xl top-1/4 left-1/4 animate-pulse-soft" />
                    <div className="h-24 w-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/20 text-xs font-mono uppercase tracking-widest">
                      Studio
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 bg-white space-y-2 border-t border-accent/20">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-accent/40 px-2 py-0.5 rounded-full inline-block">
                  {t(item.category)}
                </span>
                <h3 className="font-poppins font-bold text-lg text-slate-800">{t(item.title)}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t(item.description)}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
