"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock, Car, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export default function ContactPage() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello DermaCare+, I would like to query about a dermatology consultation.");
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <div className="relative min-h-screen py-16 px-6">
      {/* Background radial spotlights */}
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">Connect With Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins">
            Contact & Appointments
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Schedule your premium consultation or reach out to our South Mumbai coordination desk for clinical queries.
          </p>
        </div>

        {/* Contact info & form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & Timings */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick contact cards */}
            <div className="bg-white rounded-3xl p-6 border border-accent/20 shadow-sm space-y-5">
              <h3 className="font-poppins font-bold text-base text-slate-800 flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-primary" /> Clinic Coordinates
              </h3>
              
              <div className="space-y-4 text-xs text-slate-600">
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>102-103, Nariman Point Road, Chambers, Mumbai, MH - 400021</span>
                </p>

                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 22 5556 7890 / +91 98765 43210</span>
                </p>

                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@dermacareplus.com</span>
                </p>

                <p className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Mon - Sat: 10:00 AM - 07:00 PM
                    <br />
                    Sunday: Closed (Prior Booking Only)
                  </span>
                </p>
              </div>
            </div>

            {/* Parking & Services Info */}
            <div className="bg-white rounded-3xl p-6 border border-accent/20 shadow-sm space-y-4">
              <h3 className="font-poppins font-bold text-base text-slate-800 flex items-center gap-1.5">
                <Car className="h-5 w-5 text-primary" /> Parking & Accessibility
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                DermaCare+ clinic offers complimentary secure basement valet parking for all patients. Safe elevator accessibility is available directly from the parking bays to our first-floor suite reception lobby.
              </p>
            </div>

            {/* Instant Support options (WhatsApp / Phone) */}
            <div className="bg-white rounded-3xl p-6 border border-accent/25 shadow-sm space-y-4">
              <h3 className="font-poppins font-bold text-base text-slate-800">Instant Chat & Emergency</h3>
              
              <div className="space-y-3">
                {/* WhatsApp button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 border border-emerald-500 text-emerald-600 hover:bg-emerald-50/20 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5" /> Chat on WhatsApp
                </button>

                {/* Emergency Card */}
                <div className="bg-red-950/20 border border-red-900/25 p-4 rounded-xl flex gap-3 items-start">
                  <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-red-500 uppercase tracking-wider">Emergency Skin Allergy?</h5>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                      If you're suffering from acute hives or a sudden blistering eruption, contact our on-duty emergency clinician directly at <span className="font-bold text-slate-700">+91 99999 88888</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-center sm:text-left mb-2">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900">Schedule Consultation</h2>
              <p className="text-slate-500 text-xs mt-1">Select a treatment and your preferred slot to book instantly.</p>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
