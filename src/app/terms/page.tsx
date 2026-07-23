import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      
      <div className="bg-white rounded-3xl p-8 border border-accent/30 shadow-luxury space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Scale className="h-8 w-8" />
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900">Terms of Service</h1>
        </div>
        
        <p className="text-xs text-slate-550">Last updated: July 23, 2026</p>
        
        <div className="text-xs sm:text-sm text-slate-650 space-y-4 leading-relaxed">
          <p>
            Welcome to DermaCare+. By accessing or using this website to query information or request clinical appointments, you agree to comply with and be bound by the following Terms of Service.
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">1. Website Scope</h2>
          <p>
            This website provides educational materials, details about treatments offered by Dr. Aryan Sharma, and facilitates appointment requests. The submission of an appointment request does not guarantee a slot until confirmed by our reception desk.
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">2. Cancellation Policy</h2>
          <p>
            We respect your time and request that you do the same. If you need to cancel or reschedule your scheduled appointment, please notify our reception desk at least 24 hours in advance.
          </p>
          
          <h2 className="text-sm font-bold text-slate-800 pt-2 font-poppins">3. intellectual Property</h2>
          <p>
            All content, graphics, text layout, and code on this website are the intellectual property of DermaCare+ and cannot be copied, distributed, or repurposed without written authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
