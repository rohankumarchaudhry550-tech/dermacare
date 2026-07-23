import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      
      <div className="bg-white rounded-3xl p-8 border border-accent/30 shadow-luxury space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="h-8 w-8" />
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900">Privacy Policy</h1>
        </div>
        
        <p className="text-xs text-slate-550">Last updated: July 23, 2026</p>
        
        <div className="text-xs sm:text-sm text-slate-650 space-y-4 leading-relaxed">
          <p>
            At DermaCare+, we prioritize the privacy and security of our patients' personal and medical data. This Privacy Policy details how we collect, store, protect, and handle your information when you visit our website or book clinical appointments.
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">1. Information We Collect</h2>
          <p>
            We collect personal coordinates (name, phone number, email address) that you submit via our online appointment booking form. We do not collect or store sensitive medical records through this website.
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">2. How We Use Your Data</h2>
          <p>
            Your contact details are used exclusively to schedule appointments, send SMS/WhatsApp confirmations, provide pre-procedure checklists, and coordinate clinical visits with Dr. Aryan Sharma. We do not sell or lease your data to third-party marketing companies.
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">3. Data Security & Storage</h2>
          <p>
            All submitted details are transmitted securely using HTTPS protocols. Patient databases are protected behind firewalls with access restricted strictly to authorized clinic coordinators.
          </p>
        </div>
      </div>
    </div>
  );
}
