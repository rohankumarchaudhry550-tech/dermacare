"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, ArrowUp, Calendar } from "lucide-react";
import { useAppointment } from "@/context/AppointmentContext";

export default function FloatingCTA() {
  const { openModal } = useAppointment();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello DermaCare+, I would like to query about a dermatology consultation.");
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Desktop & General Floating CTA Widgets */}
      <div className="fixed bottom-24 lg:bottom-8 right-6 lg:right-8 z-40 flex flex-col gap-3">
        {/* WhatsApp Icon Button */}
        <button
          onClick={handleWhatsApp}
          className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-200 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        {/* Back to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-all hover:translate-y-[-2px] duration-200 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Sticky Bottom Appointment/Call Bar for Mobile (Visible on mobile viewports only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-accent/20 px-4 py-3 flex gap-3 shadow-[0_-8px_30px_rgb(11,110,105,0.06)] lg:hidden">
        <a
          href="tel:+912255567890"
          className="flex-1 py-3 border border-primary/30 text-primary hover:bg-primary/5 font-semibold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Phone className="h-4 w-4" /> Call Clinic
        </a>
        <button
          onClick={openModal}
          className="flex-1 py-3 text-white btn-gradient font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <Calendar className="h-4 w-4" /> Book Appt
        </button>
      </div>
    </>
  );
}
