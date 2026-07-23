import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, AlertCircle, HelpCircle, ShieldCheck, HeartPulse, Clock, Sparkles } from "lucide-react";
import treatmentsData from "@/data/treatments.json";
import Accordion from "@/components/ui/Accordion";
import BookTreatmentButton from "@/components/ui/BookTreatmentButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for Next.js to pre-render all 22 treatments
export async function generateStaticParams() {
  return treatmentsData.map((t) => ({
    slug: t.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatmentsData.find((t) => t.slug === slug);

  if (!treatment) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: `${treatment.title} | Skin & Hair Specialist`,
    description: treatment.shortDescription,
    alternates: {
      canonical: `/treatments/${treatment.slug}`,
    },
    openGraph: {
      title: `${treatment.title} | DermaCare+ Clinic`,
      description: treatment.shortDescription,
      url: `https://www.dermacareplus.com/treatments/${treatment.slug}`,
    },
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = treatmentsData.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  // Schema: Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.dermacareplus.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Treatments",
        "item": "https://www.dermacareplus.com/treatments"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": treatment.title,
        "item": `https://www.dermacareplus.com/treatments/${treatment.slug}`
      }
    ]
  };

  // Schema: FAQ markup for treatment-specific queries
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": treatment.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* Inject schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative min-h-screen py-10 px-6">
        {/* Background blobs */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          {/* Breadcrumb & Back button */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/treatments" className="hover:text-primary transition-colors">Treatments</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{treatment.title}</span>
          </div>

          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Treatments Catalog
          </Link>

          {/* Hero Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-accent/30 shadow-luxury space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-secondary bg-accent/40 px-3 py-1 rounded-full inline-block">
              {treatment.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-poppins tracking-tight">
              {treatment.title}
            </h1>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed max-w-4xl">
              {treatment.description}
            </p>
          </div>

          {/* Details layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Medical Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Symptoms & Causes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-accent/20 shadow-sm space-y-3">
                  <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-1.5">
                    <AlertCircle className="h-4.5 w-4.5 text-primary" /> Symptoms & Indicators
                  </h3>
                  <ul className="space-y-2">
                    {treatment.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-accent/20 shadow-sm space-y-3">
                  <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="h-4.5 w-4.5 text-primary" /> Primary Causes
                  </h3>
                  <ul className="space-y-2">
                    {treatment.causes.map((cause, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 bg-secondary rounded-full mt-1.5 shrink-0" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Diagnosis & Options */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-accent/20 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-primary" /> Clinical Diagnosis
                </h3>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                  {treatment.diagnosis}
                </p>
              </div>

              {/* Treatment Options details */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-accent/25 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-sm text-slate-800">Available Procedures & Pathways</h3>
                <div className="space-y-4">
                  {treatment.treatmentOptions.map((opt, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <h4 className="font-poppins font-bold text-xs sm:text-sm text-slate-850 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" /> {opt.name}
                      </h4>
                      <p className="text-xs text-slate-550 leading-relaxed pl-4">
                        {opt.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recovery, Benefits & Results */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-accent/20 shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-poppins font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                      <Clock className="h-4.5 w-4.5 text-primary" /> Recovery Timeline
                    </h4>
                    <p className="text-xs text-slate-550 leading-relaxed">
                      {treatment.recovery}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-poppins font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-primary" /> Expected Results
                    </h4>
                    <p className="text-xs text-slate-550 leading-relaxed">
                      {treatment.expectedResults}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h4 className="font-poppins font-bold text-xs sm:text-sm text-slate-800">Primary Benefits</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {treatment.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-650">
                        <Check className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Treatment FAQs */}
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800">Treatment Specific FAQs</h3>
                <Accordion items={treatment.faqs} />
              </div>
            </div>

            {/* Right Side: Sticky Booking Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-accent/30 shadow-luxury text-center space-y-6">
                <div className="w-12 h-12 rounded-full bg-accent/40 text-primary flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-poppins font-bold text-lg text-slate-800">Schedule This Treatment</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Reserve a premium slot for {treatment.title} with Dr. Aryan Sharma. Includes full diagnostic skin check.
                  </p>
                </div>
                
                <div className="space-y-3 pt-2 text-xs text-slate-600 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4.5 w-4.5 text-secondary" /> Board-certified safety</p>
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4.5 w-4.5 text-secondary" /> US-FDA approved devices</p>
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4.5 w-4.5 text-secondary" /> Personal clinical attention</p>
                </div>

                <BookTreatmentButton treatmentSlug={treatment.slug} className="w-full" />
              </div>

              {/* Quick Clinic Info Card */}
              <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 border border-slate-850 space-y-4 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider font-poppins">Clinic Details</h4>
                <p><strong>Primary Clinician:</strong> Dr. Aryan Sharma</p>
                <p><strong>Downtime Scope:</strong> {treatment.recovery.split(".")[0]}.</p>
                <p><strong>Location:</strong> Nariman Point, South Mumbai</p>
                <p><strong>Emergency Contact:</strong> +91 99999 88888</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
