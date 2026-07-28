import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import treatmentsData from "@/data/treatments.json";
import TreatmentDetailClient from "@/components/TreatmentDetailClient";

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

      <TreatmentDetailClient treatment={treatment} />
    </>
  );
}
