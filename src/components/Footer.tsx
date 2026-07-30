"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, ShieldAlert, Check } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const topTreatments = [
    { name: "Melanocyte Transfer (MKTP Surgery)", path: "#treatments" },
    { name: "Excimer Laser Therapy (308nm)", path: "#treatments" },
    { name: "Narrowband UVB Cabin", path: "#treatments" },
    { name: "Epidermal Grafting (Suction Blister)", path: "#treatments" },
    { name: "JAK Inhibitors & Topicals", path: "#treatments" }
  ];

  const quickLinks = [
    { name: "Home", path: "#home" },
    { name: "About Doctor", path: "#about" },
    { name: "Treatments", path: "#treatments" },
    { name: "Understanding Vitiligo", path: "#understanding" },
    { name: "Results Gallery", path: "#gallery" },
    { name: "Patient Reviews", path: "#reviews" },
    { name: "Contact & Booking", path: "#contact" }
  ];

  const handleScrollTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    const targetId = path.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Background radial accent glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -bottom-80 -left-60 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl -top-80 -right-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Info & Newsletter */}
        <div className="space-y-6">
          <Link href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-2 group">
            <div className="h-10 w-10 flex items-center justify-center">
              <BrandLogo className="h-full w-full text-accent" />
            </div>
            <div>
              <span className="font-poppins font-extrabold text-xl tracking-tight text-white flex items-center gap-0.5">
                DermaCare<span className="text-accent font-light">+</span>
              </span>
              <span className="text-[8px] uppercase tracking-wider text-accent font-semibold block mt-0.5 opacity-80">
                {t("Vitiligo & Leucoderma Restoration Clinic")}
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t("Led by Dr. Aryan Sharma, a board-certified dermatologist trained at AIIMS New Delhi. We specialize in Melanocyte-Keratinocyte Transplant (MKTP) and Excimer Lasers to restore your skin's natural melanin.")}
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{t("Newsletter")}</label>
            <div className="flex rounded-full overflow-hidden border border-slate-700 bg-slate-850 p-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("Enter your email")}
                className="w-full bg-transparent pl-3 pr-2 text-xs text-white focus:outline-none placeholder-slate-500"
                required
              />
              <button
                type="submit"
                className="h-8 w-8 rounded-full bg-primary hover:bg-secondary text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-secondary font-medium">{t("Successfully subscribed to medical updates!")}</p>
            )}
          </form>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-secondary pl-3">
            {t("Quick Links")}
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.path}
                  onClick={(e) => handleScrollTo(e, link.path)}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="h-1 w-1 bg-secondary rounded-full" /> {t(link.name)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Featured Treatments */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-secondary pl-3">
            {t("Top Treatments")}
          </h4>
          <ul className="space-y-3">
            {topTreatments.map((treatment, idx) => (
              <li key={idx}>
                <a
                  href={treatment.path}
                  onClick={(e) => handleScrollTo(e, treatment.path)}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="h-1 w-1 bg-primary rounded-full" /> {t(treatment.name)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-secondary pl-3">
              {t("Clinic Contact")}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>{t("102-103, Nariman Point Road, Chambers, Mumbai, MH - 400021")}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+91 22 5556 7890 / +91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-secondary" />
                <span>contact@dermacareplus.com</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  {t("Monday - Saturday")}: 10:00 AM - 07:00 PM
                  <br />
                  {t("Sunday")}: {t("Closed")} ({t("Prior Booking Only")})
                </span>
              </p>
            </div>
          </div>

          {/* Valet Parking Information */}
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex gap-3 items-start">
            <ShieldAlert className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">{t("Valet Parking Available")}</h5>
              <p className="text-[10px] text-slate-400 mt-1">
                {t("Complimentary secure basement parking and elevator access direct to clinic lobby.")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 DermaCare+. {t("All rights reserved.")}</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">{t("Privacy Policy")}</Link>
          <Link href="/terms" className="hover:text-slate-400 transition-colors">{t("Terms of Service")}</Link>
          <Link href="/disclaimer" className="hover:text-slate-400 transition-colors">{t("Medical Disclaimer")}</Link>
        </div>
      </div>
    </footer>
  );
}
