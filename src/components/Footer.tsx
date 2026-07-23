"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Clock, Send, ShieldAlert, Check } from "lucide-react";

export default function Footer() {
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
    { name: "Acne Scar Removal", path: "/treatments/acne-scar-removal" },
    { name: "PRP & GFC Hair Restoration", path: "/treatments/prp-therapy" },
    { name: "Laser Hair Removal", path: "/treatments/laser-hair-removal" },
    { name: "Botox & Dermal Fillers", path: "/treatments/botox" },
    { name: "Bespoke Hydra Facial", path: "/treatments/hydra-facial" },
    { name: "Anti-Aging Skin boosters", path: "/treatments/anti-aging" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Dr. Aryan", path: "/about" },
    { name: "Treatments", path: "/treatments" },
    { name: "Conditions Index", path: "/conditions" },
    { name: "Before & After Gallery", path: "/gallery" },
    { name: "Patient Testimonials", path: "/reviews" },
    { name: "Medical Blog", path: "/blog" },
    { name: "Contact & Booking", path: "/contact" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Background radial accent glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -bottom-80 -left-60 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl -top-80 -right-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Info & Newsletter */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-poppins font-extrabold text-xl tracking-tight text-white flex items-center gap-0.5">
                DermaCare<span className="text-secondary font-light">+</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-accent font-bold block -mt-1">
                Aesthetic & Skin Clinic
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            World-class medical dermatology and premium aesthetic procedures delivered by board-certified dermatologists using FDA-approved technology.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Newsletter</label>
            <div className="flex rounded-full overflow-hidden border border-slate-700 bg-slate-850 p-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
              <p className="text-[10px] text-secondary font-medium">Successfully subscribed to medical updates!</p>
            )}
          </form>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-secondary pl-3">
            Quick Links
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.path}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="h-1 w-1 bg-secondary rounded-full" /> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Featured Treatments */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-secondary pl-3">
            Top Treatments
          </h4>
          <ul className="space-y-3">
            {topTreatments.map((treatment, idx) => (
              <li key={idx}>
                <Link
                  href={treatment.path}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="h-1 w-1 bg-primary rounded-full" /> {treatment.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-secondary pl-3">
              Clinic Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>102-103, Nariman Point Road, Chambers, Mumbai, MH - 400021</span>
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
                  Mon - Sat: 10:00 AM - 07:00 PM
                  <br />
                  Sunday: Closed (Prior Booking Only)
                </span>
              </p>
            </div>
          </div>

          {/* Emergency support panel */}
          <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-2xl flex gap-3 items-start">
            <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider">Emergency Skin Allergy?</h5>
              <p className="text-[10px] text-slate-400 mt-1">
                Reach our on-duty clinician immediately at <span className="font-semibold text-white">+91 99999 88888</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 DermaCare+. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-slate-400 transition-colors">Medical Disclaimer</Link>
          <Link href="/sitemap" className="hover:text-slate-400 transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
