import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import conditionsData from "@/data/conditions.json";
import treatmentsData from "@/data/treatments.json";
import ConditionDetailClient from "@/components/ConditionDetailClient";

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
  const relatedTreatments = treatmentsData.filter((t) =>
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

      <ConditionDetailClient condition={condition} relatedTreatments={relatedTreatments} />
    </>
  );
}
