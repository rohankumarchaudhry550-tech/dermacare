import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, HeartPulse, User } from "lucide-react";
import conditionsData from "@/data/conditions.json";
import treatmentsData from "@/data/treatments.json";
import BookTreatmentButton from "@/components/ui/BookTreatmentButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for pre-rendering
export async function generateStaticParams() {
  return conditionsData.map((c) => ({
    slug: c.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = conditionsData.find((c) => c.slug === slug);

  if (!condition) return { title: "Condition Not Found" };

  return {
    title: `${condition.name} Guide | Symptoms & Treatments`,
    description: condition.doctorAdvice,
    alternates: {
      canonical: `/conditions/${condition.slug}`,
    },
  };
}

export default async function ConditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const condition = conditionsData.find((c) => c.slug === slug);

  if (!condition) {
    notFound();
  }

  // Find related treatments detail data
  const relatedTreatmentsData = treatmentsData.filter((t) =>
    condition.relatedTreatments.includes(t.slug)
  );

  // Schema: Breadcrumb markup
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
        "name": "Conditions Center",
        "item": "https://www.dermacareplus.com/conditions"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": condition.name,
        "item": `https://www.dermacareplus.com/conditions/${condition.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="relative min-h-screen py-10 px-6">
        {/* Decorative elements */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/conditions" className="hover:text-primary transition-colors">Conditions Center</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{condition.name}</span>
          </div>

          <Link
            href="/conditions"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Conditions Center
          </Link>

          {/* Condition Header card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-accent/30 shadow-luxury space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-secondary bg-accent/40 px-3 py-1 rounded-full inline-block">
              {condition.category} Condition Guide
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-poppins tracking-tight">
              {condition.name}
            </h1>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-3 items-start max-w-4xl">
              <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-slate-700 block font-semibold">Doctor's Clinical Summary:</strong>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                  {condition.doctorAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* Main Info Blocks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Diagnostics, symptoms, and preventions */}
            <div className="lg:col-span-8 space-y-6">
              {/* Symptoms, Causes & Risk Factors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Symptoms */}
                <div className="bg-white p-6 rounded-3xl border border-accent/20 shadow-sm space-y-3">
                  <h3 className="font-poppins font-bold text-sm text-slate-850 flex items-center gap-1.5">
                    <HeartPulse className="h-4.5 w-4.5 text-primary" /> Common Symptoms
                  </h3>
                  <ul className="space-y-2">
                    {condition.symptoms.map((s, idx) => (
                      <li key={idx} className="text-xs text-slate-650 flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Causes */}
                <div className="bg-white p-6 rounded-3xl border border-accent/20 shadow-sm space-y-3">
                  <h3 className="font-poppins font-bold text-sm text-slate-850 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary" /> Root Causes
                  </h3>
                  <ul className="space-y-2">
                    {condition.causes.map((c, idx) => (
                      <li key={idx} className="text-xs text-slate-655 flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 bg-secondary rounded-full mt-1.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Risk Factors & Diagnosis */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-accent/20 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-sm text-slate-850 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> Risks & Diagnosis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-slate-700 mb-2">Key Risk Factors:</h4>
                    <ul className="space-y-2">
                      {condition.riskFactors.map((r, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="h-1 w-1 bg-slate-400 rounded-full" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-slate-700 mb-2">Diagnostic Protocol:</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {condition.diagnosis}
                    </p>
                  </div>
                </div>
              </div>

              {/* Treatment & Prevention */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-accent/20 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-sm text-slate-850">Medical Management & Care</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-poppins font-bold text-xs text-slate-850 mb-1">Standard Treatment:</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{condition.treatment}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-poppins font-bold text-xs text-slate-850 mb-2">Prevention & Self-Care tips:</h4>
                    <ul className="space-y-2">
                      {condition.prevention.map((p, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Related Treatments & Booking */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              {/* Related Treatments listing */}
              {relatedTreatmentsData.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-accent/30 shadow-luxury space-y-4">
                  <h3 className="font-poppins font-bold text-sm text-slate-800">Related Treatments</h3>
                  <div className="space-y-3">
                    {relatedTreatmentsData.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/treatments/${t.slug}`}
                        className="block p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                      >
                        <h4 className="font-poppins font-semibold text-xs text-slate-850 group-hover:text-primary transition-colors">
                          {t.title}
                        </h4>
                        <p className="text-[10px] text-slate-450 line-clamp-1 mt-0.5">
                          {t.shortDescription}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation Booking Action */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-850 space-y-5 text-center">
                <div className="h-10 w-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-poppins font-bold text-sm">Schedule Diagnosis</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed px-2">
                    Consult Dr. Aryan Sharma for a certified diagnostic check and active clinical formulation prescriptions.
                  </p>
                </div>
                <BookTreatmentButton variant="gradient" className="w-full text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
