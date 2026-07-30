"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Compass,
  Play,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  HeartHandshake,
  HeartPulse,
  DollarSign,
  Droplet,
  MapPin,
  Clock,
  Phone,
  Car,
  Star,
  MessageSquare,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useAppointment } from "@/context/AppointmentContext";
import StatsCounter from "@/components/ui/StatsCounter";
import BeforeAfter from "@/components/ui/BeforeAfter";
import Accordion from "@/components/ui/Accordion";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { openModal } = useAppointment();
  const { t, language } = useLanguage();

  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      text: "Dr. Aryan's MKTP surgery changed my life. I had a stable white patch on my neck for 5 years. After the cellular transplant, my natural skin color matches perfectly!",
      name: "Rohan Chaudhry",
      avatar: "RC",
      date: "May 2026"
    },
    {
      id: 2,
      rating: 5,
      text: "Highly professional doctor. The Excimer laser sessions resolved the white spots on my face in just 12 weeks. The clinic staff is very caring and supportive.",
      name: "Pooja Patel",
      avatar: "PP",
      date: "June 2026"
    },
    {
      id: 3,
      rating: 5,
      text: "Excellent facilities. The full-body Narrowband UVB chamber helped stabilize my spreading vitiligo. Transparent costs and board-certified medical safety.",
      name: "Amit Sharma",
      avatar: "AS",
      date: "July 2026"
    }
  ]);

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewText.trim()) {
      const newReview = {
        id: Date.now(),
        rating: reviewRating,
        text: reviewText,
        name: reviewName,
        avatar: reviewName.substring(0, 2).toUpperCase(),
        date: "Today"
      };
      setReviews([newReview, ...reviews]);
      setReviewSubmitted(true);
      setReviewName("");
      setReviewText("");
      setTimeout(() => setReviewSubmitted(false), 5000);
    }
  };

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  const vitiligoFaqs = [
    {
      question: t("Is vitiligo contagious or hereditary?"),
      answer: t("No. Vitiligo is absolutely not contagious and cannot spread by physical contact, sharing utensils, or touch. While there is a genetic susceptibility in some cases, it is primarily an autoimmune condition.")
    },
    {
      question: t("Can vitiligo be completely cured?"),
      answer: t("While there is no permanent genetic cure, vitiligo can be successfully stabilized, and the white patches can be fully repigmented using advanced treatments like MKTP surgery, Excimer lasers, and NB-UVB phototherapy.")
    },
    {
      question: t("What is MKTP surgery and is it painful?"),
      answer: t("What is MKTP surgery and is it painful?") === "What is MKTP surgery and is it painful?" 
        ? "MKTP (Melanocyte-Keratinocyte Transplant Procedure) is a day-care surgical procedure performed under local anesthesia. The donor and recipient areas are numbed, making the process virtually pain-free. Recovery takes 1 to 2 weeks."
        : t("What is MKTP surgery and is it painful?")
    },
    {
      question: t("How do I know if my vitiligo is stable for surgery?"),
      answer: t("How do I know if my vitiligo is stable for surgery?") === "How do I know if my vitiligo is stable for surgery?"
        ? "Your vitiligo is considered stable if no new spots have appeared, no old spots have expanded, and there is no trauma-induced depigmentation (Koebner phenomenon) for at least 6 to 12 months. Dr. Aryan Sharma will perform a digital dermoscopy check to confirm."
        : t("How do I know if my vitiligo is stable for surgery?")
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/30 scroll-smooth">
      {/* BACKGROUND FLOATING GRADIENT ACCENTS */}
      <div className="absolute top-[5%] left-[5%] w-[350px] h-[350px] rounded-full bg-accent/20 blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute top-[35%] right-[5%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative overflow-hidden py-16 lg:py-28 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/40 text-primary-dark font-semibold text-xs tracking-wide uppercase"
            >
              <Sparkles className="h-3.5 w-3.5" /> {t("Vitiligo & Leucoderma Restoration Clinic")}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-poppins"
            >
              {language === "hi" ? (
                <>अपनी त्वचा का <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">प्राकृतिक रंग</span> वापस पाएं</>
              ) : (
                <>Regain Your Natural <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Skin Pigment</span></>
              )}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium"
            >
              {t("Led by Dr. Aryan Sharma, a board-certified dermatologist trained at AIIMS New Delhi. We specialize in Melanocyte-Keratinocyte Transplant (MKTP) and Excimer Lasers to restore your skin's natural melanin.")}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="px-6 py-3.5 rounded-full font-bold text-xs text-white btn-gradient flex items-center gap-2 cursor-pointer shadow-md"
              >
                {t("Book Vitiligo Assessment") || t("Book Appointment")} <Calendar className="h-4 w-4" />
              </a>
              <a
                href="#treatments"
                onClick={(e) => handleScrollTo(e, "treatments")}
                className="px-6 py-3.5 rounded-full font-bold text-xs text-slate-700 hover:text-primary border border-slate-200 hover:border-primary bg-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                {t("Explore Treatments")} <Compass className="h-4 w-4" />
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleScrollTo(e, "gallery")}
                className="px-5 py-3.5 rounded-full font-bold text-xs text-secondary hover:text-primary-dark flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="h-4 w-4 shrink-0 fill-current" /> {t("Watch Clinic Tour")}
              </a>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxury border-2 border-white/60 bg-gradient-to-tr from-accent/20 to-primary/5 p-2"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent z-10" />
              <img
                src="/vitiligo-consultation.jpg"
                alt="Vitiligo & Leucoderma Wood's Lamp Consultation"
                className="w-full h-full object-cover rounded-[1.7rem]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-10 bg-white border-y border-slate-100 relative z-10 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={15} suffix="+" />
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">{t("Years Experience")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={1200} suffix="+" />
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">{t("Successful Surgeries")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={10000} suffix="+" />
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">{t("Patients Treated")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={95} suffix="%" />
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">{t("Repigmentation Rate")}</p>
          </div>
        </motion.div>
      </section>

      {/* 3. DOCTOR PROFILE (`#about`) */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-luxury max-w-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-14 w-14 bg-accent/40 rounded-bl-3xl flex items-center justify-center text-primary z-20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="h-80 w-full rounded-2xl overflow-hidden mb-5 relative border border-accent/10">
                <img
                  src="/glowing-skin.png"
                  alt="Dr. Aryan Sharma - Vitiligo Surgeon"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <h3 className="font-poppins font-bold text-lg text-slate-800">Dr. Aryan Sharma</h3>
              <p className="text-xs text-secondary font-bold uppercase tracking-wider">{t("Chief Consultant & Surgeon")}</p>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                {t("AIIMS Trained | MKTP Fellowship | IADVL Board Certified")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("About Doctor")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              {t("Meet Dr. Aryan Sharma")}
            </h2>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider">
              {t("Vitiligo Surgery & Repigmentation Pioneer")}
            </h4>
            <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
              {t("Dr. Aryan Sharma is a board-certified dermatologist and vitiligo surgeon with over 15 years of clinical expertise. Having completed his training at AIIMS New Delhi and advanced fellowships in London and Seoul, he specializes in advanced cell transplant surgeries and laser-assisted repigmentation.")}
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-xs text-slate-500 my-4 bg-primary/[0.01] py-2 leading-relaxed">
              "{t("Skin health is more than cosmetic. It is the canvas of your immune system. Every procedure we do blends rigorous medical safety with subtle natural artistry.")}"
            </blockquote>
            
            {/* Career qualifications list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">MD - Dermatology</h5>
                  <p className="text-slate-500">AIIMS New Delhi, India</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">MKTP Surgical Fellowship</h5>
                  <p className="text-slate-500">Seoul National University, South Korea</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. TREATMENTS CATALOG (`#treatments`) */}
      <section id="treatments" className="py-20 px-6 bg-white border-y border-slate-100 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Treatments")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              {t("Clinical Treatments & Surgical Procedures")}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              {t("Scientifically Proven Methods for Melanin Restoration")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MKTP Card */}
            <div className="bg-brand-bg rounded-3xl p-6 border border-slate-100 hover:shadow-luxury hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="h-40 w-full rounded-2xl overflow-hidden mb-5 relative border border-slate-100">
                <img
                  src="/mktp-suite.jpg"
                  alt="Melanocyte Transfer MKTP Surgery Lab Suite"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full w-max block">Surgical</span>
                <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800">{t("Melanocyte Transfer (MKTP Surgery)")}</h3>
                <p className="text-xs text-slate-550 leading-relaxed">{t("A state-of-the-art cellular transplant procedure. We extract healthy melanocyte and keratinocyte skin cells from a donor area and graft them onto stable white patches to restore pigment naturally, even in large areas.")}</p>
              </div>
              <div className="pt-6 border-t border-slate-100/60 mt-6 flex justify-between items-center">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  {t("Book Appointment")}
                </a>
                <span className="text-[10px] text-slate-400 font-medium">Stability: 12 months req.</span>
              </div>
            </div>

            {/* Excimer Laser Card */}
            <div className="bg-brand-bg rounded-3xl p-6 border border-slate-100 hover:shadow-luxury hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="h-40 w-full rounded-2xl overflow-hidden mb-5 relative border border-slate-100">
                <img
                  src="/excimer-laser.jpg"
                  alt="308nm Excimer Laser Therapy device"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full w-max block">Laser & Light</span>
                <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800">{t("Excimer Laser Therapy (308nm)")}</h3>
                <p className="text-xs text-slate-550 leading-relaxed">{t("US-FDA approved target phototherapy delivering focused monochromatic UVB light. Ideal for localized white spots on the face, neck, and hands, stimulating melanin cells without affecting healthy skin.")}</p>
              </div>
              <div className="pt-6 border-t border-slate-100/60 mt-6 flex justify-between items-center">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  {t("Book Appointment")}
                </a>
                <span className="text-[10px] text-slate-400 font-medium">Localized spots</span>
              </div>
            </div>

            {/* Narrowband UVB Card */}
            <div className="bg-brand-bg rounded-3xl p-6 border border-slate-100 hover:shadow-luxury hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="h-40 w-full rounded-2xl overflow-hidden mb-5 relative border border-slate-100">
                <img
                  src="/phototherapy-room.jpg"
                  alt="Narrowband UVB Phototherapy chamber"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full w-max block">Laser & Light</span>
                <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800">{t("Narrowband UVB Cabin")}</h3>
                <p className="text-xs text-slate-550 leading-relaxed">{t("Full-body phototherapy chamber emitting a precise 311nm UV light wavelength. Recommended for widespread vitiligo to halt disease progression and promote uniform repigmentation.")}</p>
              </div>
              <div className="pt-6 border-t border-slate-100/60 mt-6 flex justify-between items-center">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  {t("Book Appointment")}
                </a>
                <span className="text-[10px] text-slate-400 font-medium">Widespread Vitiligo</span>
              </div>
            </div>

            {/* Suction Blister Card */}
            <div className="bg-brand-bg rounded-3xl p-6 border border-slate-100 hover:shadow-luxury hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden md:col-start-1">
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full w-max block">Surgical</span>
                <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800">{t("Epidermal Grafting (Suction Blister)")}</h3>
                <p className="text-xs text-slate-550 leading-relaxed">{t("A highly successful surgical grafting method. Healthy skin blisters are created on a donor site and transferred onto prepared white patches, ensuring seamless healing and uniform color match.")}</p>
              </div>
              <div className="pt-6 border-t border-slate-100/60 mt-6 flex justify-between items-center">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  {t("Book Appointment")}
                </a>
                <span className="text-[10px] text-slate-400 font-medium">Segmental/Stable</span>
              </div>
            </div>

            {/* JAK Inhibitors Card */}
            <div className="bg-brand-bg rounded-3xl p-6 border border-slate-100 hover:shadow-luxury hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden md:col-span-2">
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full w-max block">Medical Therapy</span>
                <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800">{t("JAK Inhibitors & Topicals")}</h3>
                <p className="text-xs text-slate-555 leading-relaxed">{t("Advanced medical-grade prescriptions including JAK Inhibitors (Ruxolitinib) and immunomodulatory topicals to calm localized immune response and encourage skin barrier repigmentation.")}</p>
              </div>
              <div className="pt-6 border-t border-slate-100/60 mt-6 flex justify-between items-center">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  {t("Book Appointment")}
                </a>
                <span className="text-[10px] text-slate-400 font-medium">Immune system balance</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. UNDERSTANDING VITILIGO (`#understanding`) */}
      <section id="understanding" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Conditions")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              {t("Understanding Vitiligo & Leucoderma")}
            </h2>
            <p className="text-slate-550 text-xs sm:text-sm">{t("Patient Education Center")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Block: Medical Definition */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-800 font-poppins">{t("What is Vitiligo?")}</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                {t("Vitiligo is a non-contagious skin condition where melanocytes—the cells responsible for skin pigment (melanin)—are destroyed by the body's immune system, resulting in white spots (daag). It can affect any part of the body, including hair.")}
              </p>
              
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Classification Types:</h4>
                <div className="space-y-2 text-xs">
                  <p><strong>{t("Segmental Vitiligo")}:</strong> {t("Localized to one side of the body. Usually responds extremely well to surgical cellular grafting once stabilized.")}</p>
                  <p><strong>{t("Non-Segmental Vitiligo")}:</strong> {t("Symmetrical spots appearing on both sides of the body (e.g., hands, knees). Treated via full-body NB-UVB phototherapy and JAK inhibitors.")}</p>
                </div>
              </div>
            </div>

            {/* Right Block: Surgical Stability Requirement (Crucial clinical detail) */}
            <div className="lg:col-span-6 bg-primary/5 rounded-3xl p-8 border border-primary/20 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-6 w-6" />
                <h3 className="text-lg font-bold font-poppins">{t("The Role of Stability in Surgery")}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                {t("Surgical treatments like MKTP or punch grafting require the disease to be 'stable' (meaning no new white spots have appeared, and existing ones haven't expanded for at least 12 months). Active vitiligo is treated medically or via phototherapy first.")}
              </p>
              <div className="bg-white/80 p-4 rounded-xl border border-primary/10 text-xs text-slate-550 space-y-1.5">
                <p><strong>Stability assessment markers:</strong></p>
                <p>✓ No new spots appearing for 12 months</p>
                <p>✓ No existing spots widening in size</p>
                <p>✓ No Koebner phenomenon (depigmentation at scratch marks)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. BEFORE & AFTER RESULTS GALLERY (`#gallery`) */}
      <section id="gallery" className="py-20 px-6 bg-white border-y border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Gallery")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins leading-tight">
              {t("Clinical Results & Success Stories")}
            </h2>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider">
              {t("Interactive Before & After Repigmentation Outcomes")}
            </h4>
            <p className="text-slate-650 text-xs leading-relaxed">
              {t("Drag the dividing bar to observe the resurfacing and scar remodeling results achieved by Dr. Aryan Sharma.")}
            </p>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs text-slate-500 space-y-2">
              <h5 className="font-semibold text-slate-800">{t("Stable Vitiligo Patch on Hand")}</h5>
              <p>{t("Notice the complete pigment restoration achieved 6 months post-MKTP cell transplant surgery by Dr. Aryan Sharma.")}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <BeforeAfter
              title={t("Stable Vitiligo Patch on Hand")}
              beforeLabel={t("Before Treatment")}
              afterLabel={t("After 6 Months")}
            />
          </div>
        </div>
      </section>

      {/* 7. CINEMATIC CLINIC TOUR */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="rounded-[2.5rem] p-8 md:p-16 text-white text-left relative overflow-hidden shadow-luxury min-h-[360px] flex items-center bg-slate-950">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/clinic-lounge.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-0" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">{t("Tour Our Specialised Facility")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white leading-tight">
              {t("Sterile Surgical Theatres & Advanced Medical Phototherapy Cabins")}
            </h2>
            <p className="text-teal-50/80 text-xs sm:text-sm leading-relaxed">
              {t("Watch Dr. Aryan Sharma demonstrate our clinical protocols, laser theatres, and patient-first safety hygiene. Experience the premium care and luxury environment from your device.")}
            </p>
            
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                className="px-6 py-3.5 rounded-full text-xs font-bold bg-white text-primary hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Play className="h-4 w-4 fill-current text-primary" /> {t("Play Video Tour") || "वीडियो टूर चलाएं"}
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="px-6 py-3.5 rounded-full text-xs font-bold border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {t("Book Appointment")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PATIENT TESTIMONIALS & WRITE REVIEW (`#reviews`) */}
      <section id="reviews" className="py-20 px-6 bg-white border-y border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reviews list */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Reviews")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              {t("Verified Patient Reviews")}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              {t("Read transparent, clinical feedback from patients treated at DermaCare+. We preserve trust by verifying every review via medical registration numbers.")}
            </p>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-brand-bg rounded-3xl p-6 border border-slate-100 flex gap-4 items-start shadow-sm transition-all duration-300">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                    {rev.avatar}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs text-slate-800">{rev.name}</h4>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 text-yellow-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-650 italic leading-relaxed">
                      "{t(rev.text)}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Review box */}
          <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-150 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquare className="h-5 w-5" />
              <h3 className="text-lg font-bold font-poppins">{t("Write a Patient Review")}</h3>
            </div>
            
            {reviewSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl text-center space-y-2">
                <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800">{t("Review Submitted!")}</h4>
                <p className="text-xs text-slate-550">{t("Thank you for sharing your experience. We are updating the feedback desk.")}</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{t("Full Name")}</label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                    placeholder={t("Enter your name")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{t("Star Rating")}</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-xs bg-white"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{t("Review Comments")}</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    rows={3}
                    placeholder={t("Share details of your clinical journey, result timelines, and doctor care...")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-xs bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-bold text-white btn-gradient flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {t("Submit Verified Review")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FAQs ACCORDION SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block flex items-center justify-center gap-1">
            <HelpCircle className="h-4 w-4" /> {t("Frequently Asked Questions")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
            {t("Frequently Asked Questions")}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">{t("Clear Doubts Regarding Vitiligo & Surgery")}</p>
        </div>

        <Accordion items={vitiligoFaqs} />
      </section>

      {/* 10. BOOKING FORM & COORDINATES SECTION (`#contact`) */}
      <section id="contact" className="py-20 px-6 bg-brand-card border-t border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coordinates left card */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Contact")}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
                {t("Schedule Your Vitiligo Consultation")}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {t("Book a private diagnostic slot with Dr. Aryan Sharma. Includes Wood's lamp mapping and a custom repigmentation roadmap.")}
              </p>
            </div>

            {/* Clinic Details */}
            <div className="space-y-4 text-xs text-slate-650">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">Clinic Location</h5>
                  <p>{t("102-103, Nariman Point Road, Chambers, Mumbai, MH - 400021")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">Operational Hours</h5>
                  <p>{t("Monday - Saturday")}: 10:00 AM - 07:00 PM</p>
                  <p>{t("Sunday")}: {t("Closed")} ({t("Prior Booking Only")})</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">Direct Inquiries</h5>
                  <p>+91 22 5556 7890 / +91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-800">{t("Valet Parking Available")}</h5>
                  <p>{t("Complimentary secure basement parking and elevator access direct to clinic lobby.")}</p>
                </div>
              </div>
            </div>

            {/* Instant contact info */}
            <div className="p-5 bg-secondary/5 border border-secondary/15 rounded-3xl flex gap-3 items-start max-w-sm">
              <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t("Reach our coordinator desk instantly at")}</h5>
                <p className="text-sm font-extrabold text-primary mt-1">+91 99999 88888</p>
              </div>
            </div>
          </div>

          {/* Interactive Booking form right */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}
