"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DisclaimerPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> {t("Back to Home")}
      </Link>
      
      <div className="bg-white rounded-3xl p-8 border border-accent/30 shadow-luxury space-y-6">
        <div className="flex items-center gap-2 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900">{t("Medical Disclaimer")}</h1>
        </div>
        
        <p className="text-xs text-slate-550">{t("Last updated: July 23, 2026")}</p>
        
        <div className="text-xs sm:text-sm text-slate-650 space-y-4 leading-relaxed">
          <p className="font-semibold text-slate-800">
            {t("IMPORTANT: PLEASE READ THE FOLLOWING DISCLAIMER CAREFULLY BEFORE ACCESSING THE CONTENT OF THIS WEBSITE.")}
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">{t("1. Educational Material Only")}</h2>
          <p>
            {t("The textual information, lists, causes, symptoms, and doctor advice statements published across this website, including details in the Treatments, Conditions Center, and Blog sections, are designed solely for general educational purposes. None of the content constitutes formal medical diagnostic opinions, surgical recommendations, or prescription instructions.")}
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">{t("2. No Physician-Patient Relationship")}</h2>
          <p>
            {t("Accessing this website, reading blogs, or sending appointment requests via our forms does not establish a formal physician-patient relationship between you and Dr. Aryan Sharma. A formal relationship is only established upon completing an in-person diagnostic consultation at our clinic.")}
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">{t("3. Emergency Situations")}</h2>
          <p>
            {t("If you are experiencing a severe, life-threatening allergic reaction, acute facial swelling, or severe drug eruptions, do not rely on this website. Please go directly to the nearest hospital emergency room or contact your local government emergency services.")}
          </p>
        </div>
      </div>
    </div>
  );
}
