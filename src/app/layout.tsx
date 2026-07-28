import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import AppointmentModal from "@/components/AppointmentModal";
import PageTransition from "@/components/ui/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | DermaCare+ Luxury Skin & Hair Clinic",
    default: "DermaCare+ | Luxury Dermatology, Skin, Hair & Aesthetic Clinic",
  },
  description: "Experience premium, FDA-approved dermatology and aesthetic care with Dr. Aryan Sharma. Specialized acne, hair loss, laser, and anti-aging treatments in Mumbai.",
  metadataBase: new URL("https://www.dermacareplus.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DermaCare+ | Luxury Dermatology, Skin & Hair Clinic",
    description: "Premium, state-of-the-art dermatological and aesthetic treatments tailored to your unique skin needs by Dr. Aryan Sharma.",
    url: "https://www.dermacareplus.com",
    siteName: "DermaCare+",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DermaCare+ | Luxury Dermatology, Skin & Hair Clinic",
    description: "Premium skin, hair, and aesthetic care using cutting-edge medical lasers under board-certified guidance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Medical Organization Schema
  const medicalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "DermaCare+ Luxury Clinic",
    "alternateName": "DermaCare Plus",
    "description": "Premium luxury dermatology, hair transplant, and aesthetic clinic in Mumbai headed by Dr. Aryan Sharma.",
    "url": "https://www.dermacareplus.com",
    "logo": "https://www.dermacareplus.com/logo.png",
    "telephone": "+91-22-5556-7890",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "102-103, Nariman Point Road, Chambers",
      "addressLocality": "Mumbai",
      "addressRegion": "MH",
      "postalCode": "400021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.9281",
      "longitude": "72.8258"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dermacareplus",
      "https://www.facebook.com/profile.php?id=dermacareplus"
    ]
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text">
        <LanguageProvider>
          <AppointmentProvider>
            <PageTransition />
            <div className="w-full overflow-x-hidden relative flex flex-col min-h-screen">
              <Navbar />
              {/* Main content wrapper with padding for navbar spacing */}
              <main className="flex-grow pt-[72px] lg:pt-[80px]">
                {children}
              </main>
              <Footer />
              <FloatingCTA />
              <AppointmentModal />
            </div>
          </AppointmentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
