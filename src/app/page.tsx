"use client";

import React from "react";
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
  Car
} from "lucide-react";
import { useAppointment } from "@/context/AppointmentContext";
import StatsCounter from "@/components/ui/StatsCounter";
import BeforeAfter from "@/components/ui/BeforeAfter";
import Accordion from "@/components/ui/Accordion";
import treatmentsData from "@/data/treatments.json";
import blogData from "@/data/blog.json";
import reviewsData from "@/data/reviews.json";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { openModal } = useAppointment();
  const { t, language } = useLanguage();

  // Pick top 4 treatments to feature
  const featuredTreatments = treatmentsData.slice(0, 4);
  // Pick latest 3 blogs
  const latestBlogs = blogData.slice(0, 3);
  // Pick a couple of reviews
  const featuredReviews = reviewsData.reviews.slice(0, 3);

  // 12 Home Page FAQs
  const homeFaqs = [
    {
      question: "What should I expect during my first dermatology consultation?",
      answer: "Your initial consultation involves a detailed analysis of your skin or hair type, a review of your medical history, and a discussion of your concerns. We utilize digital dermoscopy if necessary to evaluate skin layers, culminating in a bespoke, written treatment and home-care plan."
    },
    {
      question: "Are clinical skin treatments safe for Indian skin types?",
      answer: "Absolutely. Indian skin is prone to hyperpigmentation if treated with incorrect laser settings. We use only US-FDA approved technologies (like long-pulse Nd:YAG and cooling-equipped diode lasers) calibrated specifically for Fitzpatrick skin types III to VI, ensuring total safety and efficacy."
    },
    {
      question: "How many sessions are usually required for Laser Hair Removal?",
      answer: "Most patients require 6 to 8 sessions spaced 4 to 6 weeks apart. This is because hair lasers can only disable follicles during their active growth phase (Anagen). Each session reduces density and slows growth progressively."
    },
    {
      question: "Is there a consultation fee, and is prior booking mandatory?",
      answer: "Yes, there is a standard consultation fee of ₹1,000 for clinical evaluations. Prior booking is highly recommended to minimize wait times, though we do accommodate walk-ins when slots are open."
    },
    {
      question: "How long does the recovery take after a Fractional CO2 Laser session?",
      answer: "Fractional lasers have a downtime of 4 to 7 days. You will experience redness and swelling resembling a mild sunburn for the first 48 hours, followed by microscopic skin crusting that flakes off naturally within a week."
    },
    {
      question: "Are Botox and Dermal Fillers permanent, and can they be reversed?",
      answer: "They are not permanent. Botox relaxes wrinkles for 4 to 6 months. Hyaluronic acid dermal fillers restore volume for 9 to 18 months. Fillers are fully reversible and can be dissolved instantly using a clinical enzyme injection (Hyaluronidase)."
    },
    {
      question: "Do you offer emergency appointments for sudden, severe skin rashes?",
      answer: "Yes, we reserve priority emergency slots daily for acute conditions like severe allergic urticaria, shingles outbreaks, or painful skin infections. Contact our reception directly at +91 99999 88888 for immediate assistance."
    },
    {
      question: "What is the difference between PRP and GFC hair therapies?",
      answer: "Traditional PRP involves centrifuging blood to separate plasma containing platelets, which is then injected. GFC (Growth Factor Concentrate) goes a step further: it pre-activates the platelets in a laboratory tube to release standardized, pure growth factors, resulting in zero cellular waste, significantly less scalp pain, and faster clinical hair density improvements."
    },
    {
      question: "Do I need to stop my home skincare products before a chemical peel?",
      answer: "Yes. You must discontinue active ingredients like Retinol, Glycolic Acid, Salicylic Acid, and prescription creams for 3 days prior to your clinical peeling session to avoid over-sensitizing the skin barrier."
    },
    {
      question: "Are the procedures performed directly by Dr. Aryan Sharma?",
      answer: "All injectable procedures (Botox, Fillers, Subcision) and high-energy laser treatments are performed exclusively by Dr. Aryan Sharma. Standard facials, chemical peels, and hair-wash GFC preparations are done by certified clinical therapists under his direct supervision."
    },
    {
      question: "Is parking available at the Nariman Point clinic?",
      answer: "Yes, we provide dedicated complimentary valet parking in the basement of our building for all patients. There is also an elevator from the parking bays directly to our clinic reception on the first floor."
    },
    {
      question: "Do you prescribe medicines that I can purchase elsewhere?",
      answer: "We provide detailed, standard medical prescriptions with generic formulations. You are welcome to purchase medicines from any pharmacy of your choice, though we do stock premium clinical-grade dermaceuticals at our clinic pharmacy for your convenience."
    }
  ];

  const homeFaqsHi = [
    {
      question: "मुझे अपने पहले त्वचा परामर्श (कंसल्टेशन) के दौरान क्या उम्मीद करनी चाहिए?",
      answer: "आपके प्रारंभिक परामर्श में आपकी त्वचा या बालों के प्रकार का विस्तृत विश्लेषण, आपके चिकित्सा इतिहास की समीक्षा और आपकी चिंताओं पर चर्चा शामिल है। हम त्वचा की परतों का मूल्यांकन करने के लिए यदि आवश्यक हो तो डिजिटल डर्मोस्कोपी का उपयोग करते हैं, जिसके बाद एक व्यक्तिगत लिखित उपचार और घर पर देखभाल की योजना दी जाती है।"
    },
    {
      question: "क्या भारतीय त्वचा के लिए क्लीनिकल स्किन ट्रीटमेंट सुरक्षित हैं?",
      answer: "बिल्कुल। गलत लेजर सेटिंग्स के उपयोग से भारतीय त्वचा में हाइपरपिग्मेंटेशन (काले धब्बे) होने का खतरा अधिक रहता है। हम केवल US-FDA प्रमाणित तकनीकों (जैसे लॉन्ग-पल्स Nd:YAG और कूलिंग से लैस डायोड लेजर) का उपयोग करते हैं जिन्हें विशेष रूप से भारतीय त्वचा के प्रकारों (Fitzpatrick त्वचा प्रकार III से VI) के लिए कैलिब्रेट किया गया है, जो पूर्ण सुरक्षा और प्रभावशीलता सुनिश्चित करता है।"
    },
    {
      question: "लेजर हेयर रिमूवल के लिए आमतौर पर कितने सत्रों की आवश्यकता होती है?",
      answer: "अधिकांश रोगियों को 4 से 6 सप्ताह के अंतराल पर 6 से 8 सत्रों की आवश्यकता होती है। ऐसा इसलिए है क्योंकि हेयर लेजर केवल सक्रिय विकास चरण (एनाजेन) के दौरान ही बालों के रोम को निष्क्रिय कर सकते हैं। प्रत्येक सत्र बालों के घनत्व को उत्तरोत्तर कम करता है और विकास को धीमा करता है।"
    },
    {
      question: "क्या परामर्श शुल्क (कंसल्टेशन फीस) है, और क्या पहले से बुकिंग करना अनिवार्य है?",
      answer: "हां, क्लिनिकल मूल्यांकन के लिए ₹1,000 का मानक परामर्श शुल्क है। प्रतीक्षा समय को कम करने के लिए पहले से बुकिंग करने की अत्यधिक सलाह दी जाती है, हालांकि स्लॉट खाली होने पर हम बिना बुकिंग वाले मरीजों (वॉक-इन) को भी देखते हैं।"
    },
    {
      question: "फ्रैक्शनल CO2 लेजर सत्र के बाद ठीक होने में कितना समय लगता है?",
      answer: "फ्रैक्शनल लेजर के बाद त्वचा को सामान्य होने में 4 से 7 दिन का समय लगता है। पहले 48 घंटों तक आपको हल्की सनबर्न जैसी लालिमा और सूजन महसूस होगी, जिसके बाद त्वचा पर बारीक पपड़ी बनेगी जो एक सप्ताह के भीतर अपने आप निकल जाती है।"
    },
    {
      question: "क्या बोटोक्स और डर्मल फिलर्स स्थायी होते हैं, और क्या इन्हें बेअसर (रिवर्स) किया जा सकता है?",
      answer: "ये स्थायी नहीं होते हैं। बोटोक्स 4 से 6 महीने तक झुर्रियों को कम करता है। हाइलूरोनिक एसिड डर्मल फिलर्स 9 से 18 महीने तक चेहरे का वॉल्यूम बनाए रखते हैं। फिलर्स पूरी तरह से प्रतिवर्ती (रिवर्सिबल) हैं और एक क्लिनिकल एंजाइम इंजेक्शन (हायल्यूरोनिडेज) का उपयोग करके तुरंत घोले जा सकते हैं।"
    },
    {
      question: "क्या आप अचानक त्वचा पर गंभीर रैश होने के लिए तत्काल अपॉइंटमेंट प्रदान करते हैं?",
      answer: "हां, हम गंभीर एलर्जी, दाद (शिंगल्स) के प्रकोप, या दर्दनाक त्वचा संक्रमण जैसी तीव्र स्थितियों के लिए प्रतिदिन प्राथमिकता वाले आपातकालीन स्लॉट आरक्षित रखते हैं। तत्काल सहायता के लिए हमारे रिसेप्शन से सीधे +91 99999 88888 पर संपर्क करें।"
    },
    {
      question: "पीआरपी (PRP) और जीएफसी (GFC) हेयर थेरेपी में क्या अंतर है?",
      answer: "पारंपरिक पीआरपी में प्लेटलेट्स युक्त प्लाज्मा को अलग करने के लिए खून को सेंट्रीफ्यूज किया जाता है, जिसे बाद में स्कैल्प में इंजेक्ट किया जाता है। जीएफसी (ग्रोथ फैक्टर कंसंट्रेट) इससे एक कदम आगे है: यह शुद्ध ग्रोथ फैक्टर्स जारी करने के लिए लेबोरेटरी ट्यूब में प्लेटलेट्स को पहले से सक्रिय करता है, जिसके परिणामस्वरूप दर्द बहुत कम होता है और बालों का घनत्व तेजी से बेहतर होता है।"
    },
    {
      question: "क्या मुझे केमिकल पील से पहले अपने घर के स्किनकेयर उत्पादों को बंद करने की आवश्यकता है?",
      answer: "हां। त्वचा को अत्यधिक संवेदनशील होने से बचाने के लिए आपको अपने क्लिनिकल पीलिंग सत्र से 3 दिन पहले रेटिनॉल, ग्लाइकोलिक एसिड, सैलिसिलिक एसिड और प्रिस्क्रिप्शन क्रीम जैसी सक्रिय सामग्रियों का उपयोग बंद कर देना चाहिए।"
    },
    {
      question: "क्या सभी प्रक्रियाएं सीधे डॉ. आर्यन शर्मा द्वारा की जाती हैं?",
      answer: "सभी इंजेक्शन वाली प्रक्रियाएं (बोटोक्स, फिलर्स, सबसिशन) और हाई-एनर्जी लेजर उपचार विशेष रूप से डॉ. आर्यन शर्मा द्वारा किए जाते हैं। मानक फेशियल, केमिकल पील्स और जीएफसी की तैयारी उनके सीधे पर्यवेक्षण के तहत प्रमाणित थेरेपिस्ट द्वारा की जाती है।"
    },
    {
      question: "क्या नरीमन पॉइंट क्लिनिक में पार्किंग उपलब्ध है?",
      answer: "हां, हम अपने सभी मरीजों के लिए हमारी इमारत के बेसमेंट में समर्पित मानार्थ वैलेट पार्किंग (कॉम्प्लिमेंट्री वैलेट पार्किंग) प्रदान करते हैं। पार्किंग क्षेत्र से सीधे पहली मंजिल पर हमारे क्लिनिक रिसेप्शन तक लिफ्ट भी उपलब्ध है।"
    },
    {
      question: "क्या आप ऐसी दवाएं लिखते हैं जिन्हें मैं कहीं और से खरीद सकूं?",
      answer: "हम जेनेरिक योगों के साथ विस्तृत, मानक चिकित्सा नुस्खे प्रदान करते हैं। आप अपनी पसंद की किसी भी फार्मेसी से दवाएं खरीदने के लिए स्वतंत्र हैं, हालांकि आपकी सुविधा के लिए हम हमारे क्लिनिक फार्मेसी में प्रीमियम क्लिनिकल-ग्रेड दवाएं भी रखते हैं।"
    }
  ];

  const faqs = language === "hi" ? homeFaqsHi : homeFaqs;

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND FLOATING GRADIENT ACCENTS */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/25 blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40 text-primary-dark font-semibold text-xs tracking-wide uppercase"
            >
              <Sparkles className="h-4 w-4" /> {t("Mumbai's Premier Skin & Hair Destination")}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-poppins"
            >
              {language === "hi" ? (
                <>स्वस्थ त्वचा की शुरुआत <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">विशेषज्ञ देखभाल</span> से होती है</>
              ) : (
                <>Healthy Skin Begins with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Expert Care</span></>
              )}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {t("Advanced Dermatology, Hair Restoration, Laser Treatments, and Aesthetic Solutions tailored to your unique skin needs using modern medical technology.")}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={openModal}
                className="px-8 py-4 rounded-full font-bold text-sm text-white btn-gradient flex items-center gap-2 cursor-pointer shadow-md"
              >
                {t("Book Appointment")} <Calendar className="h-4 w-4" />
              </button>
              <Link
                href="/treatments"
                className="px-8 py-4 rounded-full font-bold text-sm text-slate-700 hover:text-primary border border-slate-200 hover:border-primary bg-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                {t("Explore Treatments")} <Compass className="h-4 w-4" />
              </Link>
              <a
                href="#tour"
                className="px-6 py-4 rounded-full font-bold text-xs text-secondary hover:text-primary-dark flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="h-4 w-4 shrink-0 fill-current" /> {t("Watch Clinic Tour")}
              </a>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxury border-2 border-white/60 bg-gradient-to-tr from-accent/20 to-primary/5 p-2 animate-float"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent z-10" />
              <img
                src="/hero-consultation.png"
                alt="Luxury Dermatology Consultation"
                className="w-full h-full object-cover rounded-[1.7rem]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-white border-y border-accent/20 relative z-10 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={25} suffix="+" />
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{t("Years Experience")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={30000} suffix="+" />
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{t("Happy Patients")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={150} suffix="+" />
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{t("Treatments Offered")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-poppins">
              <StatsCounter target={98} suffix="%" />
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{t("Patient Satisfaction")}</p>
          </div>
        </motion.div>
      </section>

      {/* 3. DOCTOR INTRODUCTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-3xl p-6 border border-accent/30 shadow-luxury max-w-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-16 w-16 bg-accent/40 rounded-bl-3xl flex items-center justify-center text-primary z-20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="h-64 w-full rounded-2xl overflow-hidden mb-6 relative border border-accent/10">
                <img
                  src="/glowing-skin.png"
                  alt="Dr. Aryan Sharma Consultation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-poppins font-bold text-lg text-slate-800">Dr. Aryan Sharma</h3>
              <p className="text-xs text-secondary font-semibold">{t("Chief Consultant & Surgeon")}</p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {t("Expert in complex aesthetic lasers, dermal injection science, and clinical skin restoration therapies.")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Meet the Specialist")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              {t("Pioneering Clinical Artistry & Scientific Trust")}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t("Dr. Aryan Sharma is an award-winning dermatologist with over 15 years of experiences in clinical dermatology and aesthetic injectables. Trained at the prestigious AIIMS New Delhi and holding advanced fellowships from London & Seoul, he brings global skincare benchmarks to India.")}
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-slate-500 my-4 bg-primary/[0.01] py-2">
              "{t("Skin health is more than cosmetic. It is the canvas of your immune system. Every procedure we do blends rigorous medical safety with subtle natural artistry.")}"
            </blockquote>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white btn-gradient shadow-md cursor-pointer"
              >
                {t("Read Professional Biography")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. FEATURED TREATMENTS */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Clinical Services")}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins mt-1">
                {t("Featured Dermatological Treatments")}
              </h2>
            </div>
            <Link
              href="/treatments"
              className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 hover:translate-x-1 transition-all"
            >
              {t("View All 22 Treatments")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTreatments.map((treatment) => (
              <div
                key={treatment.slug}
                className="bg-brand-bg rounded-3xl p-6 border border-accent/30 flex flex-col justify-between hover:shadow-luxury hover:border-secondary/40 transition-all duration-300 group"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-accent/40 px-2 py-0.5 rounded-full block w-max">
                    {t(treatment.category)}
                  </span>
                  <h3 className="font-poppins font-bold text-lg text-slate-800 mt-4 group-hover:text-primary transition-colors">
                    {t(treatment.title)}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {t(treatment.shortDescription)}
                  </p>
                </div>
                <div className="pt-6 border-t border-accent/20 mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary transition-colors">{t("Learn More")}</span>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="h-8 w-8 rounded-full bg-white border border-accent/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. WHY CHOOSE OUR CLINIC */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          <div className="text-center space-y-4">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Quality Indicators")}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
            {t("Why Patients Trust DermaCare+")}
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            {t("We hold ourselves to strict medical standards, ensuring a sterile clinical layout coupled with bespoke hospitality.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Experienced Dermatologist", desc: "Board-certified doctors with over 15+ years of clinical and surgical expertise.", icon: <ShieldCheck className="h-6 w-6 text-primary" /> },
            { title: "Modern Technology", desc: "Equipped with FDA-approved laser devices for precise diagnostic targeting.", icon: <Zap className="h-6 w-6 text-primary" /> },
            { title: "Advanced Laser Systems", desc: "Precise fractional resurfacing, Nd:YAG toning, and cooling pain-free diodes.", icon: <Activity className="h-6 w-6 text-primary" /> },
            { title: "Personalized Treatment", desc: "No generic templates. Every script and procedure tailored for your skin type.", icon: <HeartHandshake className="h-6 w-6 text-primary" /> },
            { title: "Affordable Consultation", desc: "Transparent, honest costing plans with high-grade prescription options.", icon: <DollarSign className="h-6 w-6 text-primary" /> },
            { title: "Hygienic Environment", desc: "Class-100 sterile surgical suites, air filtering, and strict medical hygiene.", icon: <Droplet className="h-6 w-6 text-primary" /> },
            { title: "Friendly Staff", desc: "Premium patient coordinators ensuring a luxurious and comfortable visit.", icon: <HeartPulse className="h-6 w-6 text-primary" /> },
            { title: "Privacy Assured", desc: "Strict physician-patient confidentiality records keeping your treatments private.", icon: <ShieldCheck className="h-6 w-6 text-primary" /> },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-accent/20 hover:border-primary/20 shadow-sm transition-all duration-300">
              <div className="h-12 w-12 rounded-2xl bg-accent/40 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-poppins font-bold text-sm text-slate-800 mb-2">{t(item.title)}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t(item.desc)}</p>
            </div>
          ))}
        </div>
        </motion.div>
      </section>

      {/* 6. TREATMENT JOURNEY */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Our Protocol")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white">
              {t("Your Treatment Journey") || t("The Treatment Journey")}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              {t("How we guide patients from the initial consultation to flawless long-term clinical maintenance.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {[
              { num: "01", title: "Consultation", desc: "Comprehensive review of medical records, triggers, and physical concerns." },
              { num: "02", title: "Skin Analysis", desc: "Dermoscopy mapping of pores, pigments, hydration, and sebum." },
              { num: "03", title: "Diagnosis", desc: "Isolating the root clinical cause of your skin/hair condition." },
              { num: "04", title: "Treatment Plan", desc: "Bespoke laser or clinical recipes engineered for your skin type." },
              { num: "05", title: "Follow-up Care", desc: "Post-op schedules and active barriers support routines." },
            ].map((step, idx) => (
              <div key={idx} className="relative space-y-4">
                <div className="h-16 w-16 rounded-full border border-secondary/40 bg-secondary/5 text-secondary flex items-center justify-center mx-auto text-lg font-bold font-mono">
                  {step.num}
                </div>
                <h3 className="font-poppins font-bold text-sm text-white">{t(step.title)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed px-4">{t(step.desc)}</p>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-8 left-[70%] w-[60%] h-0.5 border-t border-dashed border-secondary/20 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLINIC BEFORE & AFTER PREVIEW */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Interactive Demonstration") || t("Proven Outcomes")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins leading-tight">
              {t("Clinical Case Study") || t("Real Patients, Verified Results")}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t("Drag the dividing bar to observe the resurfacing and scar remodeling results achieved by Dr. Aryan Sharma.")}
            </p>
            <div className="space-y-4 text-xs text-slate-500">
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> {t("No photo filter manipulations") || "कोई फोटो फ़िल्टर हेरफेर नहीं"}</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> {t("Identical clinical lighting benchmarks") || "समान क्लिनिक लाइटिंग मानक"}</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> {t("Fully consent-cleared patient success records") || "पूर्ण सहमति-स्वीकृत रोगी सफलता रिकॉर्ड"}</p>
            </div>
            <div className="pt-2">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white btn-gradient shadow-md cursor-pointer"
              >
                {t("Clinic Gallery & Results") || t("View Before & After Gallery")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL PREVIEW */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("What Our Patients Say")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              {t("Verified Reviews & Case Studies")}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">{t("Average 4.9/5 stars based on 2,350+ certified Google and Clinic reviews.")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev) => (
              <div key={rev.id} className="bg-brand-bg rounded-3xl p-6 border border-accent/20 flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex gap-1 text-yellow-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    "{t(rev.text)}"
                  </p>
                </div>
                <div className="pt-6 border-t border-accent/20 mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-slate-800">{t(rev.name)}</h4>
                    <p className="text-[10px] text-slate-400">{t("Verified Patient")} | {rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="text-xs font-bold text-primary hover:text-primary-dark underline underline-offset-4 cursor-pointer"
            >
              {t("Read all verified patient reviews")}
            </Link>
          </div>
        </div>
      </section>

      {/* 9. TOUR SECTION */}
      <span id="tour" className="scroll-mt-24" />
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="rounded-[2.5rem] p-8 md:p-16 text-white text-left relative overflow-hidden shadow-luxury min-h-[350px] flex items-center bg-slate-950">
          {/* Background image of luxury lounge */}
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/clinic-lounge.png')" }} />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">{t("Interactive Video Tour")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white leading-tight">
              {t("A Virtual Walkthrough of Our Luxury Facility")}
            </h2>
            <p className="text-teal-50/80 text-xs sm:text-sm leading-relaxed">
              {t("Take a walk through our premier consulting rooms, diagnostic laser zones, and sterilizing medical theater. Experience hospitality and clinical safety from your screen.")}
            </p>
            <div className="pt-4 flex gap-4">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                className="px-6 py-3.5 rounded-full text-xs font-bold bg-white text-primary hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Play className="h-4 w-4 fill-current text-primary" /> {t("Play Video Tour")}
              </a>
              <Link
                href="/gallery"
                className="px-6 py-3.5 rounded-full text-xs font-bold border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {t("Inspect Interior Photos")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LATEST BLOGS */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Educational Blog")}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins mt-1">
                {t("Latest Clinical Insights & Care Guides")}
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 hover:translate-x-1 transition-all"
            >
              {t("Open Medical Blog")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((post) => (
              <div key={post.slug} className="bg-brand-bg rounded-3xl overflow-hidden border border-accent/20 flex flex-col justify-between shadow-sm hover:shadow-luxury transition-all duration-300">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-secondary font-bold uppercase tracking-wider">
                    <span>{t(post.category)}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-poppins font-bold text-base sm:text-lg text-slate-800 line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{t(post.title)}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {t(post.excerpt)}
                  </p>
                </div>
                <div className="p-6 border-t border-accent/10 flex justify-between items-center bg-white">
                  <span className="text-[10px] text-slate-400">{post.publishDate}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-0.5 cursor-pointer"
                  >
                    {t("Read Article")} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Information Desk")}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
            {t("Frequently Answered Questions")}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">{t("Get clear clinical answers regarding procedures, downtime, safety, and policies.")}</p>
        </div>

        <Accordion items={faqs} />
      </section>

      {/* 12. CLINIC LOCATION MAP PREVIEW */}
      <section className="py-20 px-6 bg-brand-card border-t border-accent/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Our Location")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins leading-tight">
              {t("DermaCare+ Nariman Point, Mumbai")}
            </h2>
            <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
              {t("Located in the premium commercial district of South Mumbai. Easily accessible by road and train, offering state-of-the-art facilities, private waiting rooms, and personalized care.")}
            </p>
            
            <div className="space-y-4 text-xs text-slate-600">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                <span>{t("102-103, Nariman Point Road, Chambers, Mumbai, MH - 400021")}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-primary" />
                <span>+91 22 5556 7890 / +91 98765 43210</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                <span>
                  {t("Monday - Saturday")}: 10:00 AM - 07:00 PM <br /> 
                  {t("Sunday")}: {t("Closed")} ({t("Prior Booking Only")})
                </span>
              </p>
              <p className="flex items-start gap-2.5 bg-primary/5 p-4 rounded-xl border border-primary/10">
                <Car className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700 block font-semibold">{t("Parking Information:")}</strong>
                  {t("Complimentary basement valet parking is available for all registered patients.")}
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 h-80 sm:h-96 rounded-3xl overflow-hidden border border-accent/40 relative shadow-sm bg-slate-100 flex items-center justify-center">
            {/* Elegant Map Mock Grid using pure CSS and elements to look premium and customized */}
            <div className="absolute inset-0 bg-slate-200 bg-[linear-gradient(rgba(11,110,105,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(11,110,105,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
            {/* Custom styled map elements for a premium layout */}
            <div className="absolute w-[60%] h-4 bg-white/40 border border-slate-300 rounded rotate-12 top-1/4 left-1/4" />
            <div className="absolute w-[80%] h-6 bg-white/40 border border-slate-300 rounded -rotate-6 bottom-1/4 right-1/10" />
            <div className="absolute w-[30%] h-20 bg-slate-300/30 border-r border-slate-400 rotate-45 top-1/3 left-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 space-y-2">
              <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 bg-white/95 px-3 py-1.5 rounded-full border border-accent shadow-sm block">
                {t("DermaCare+ Clinic") || "DermaCare+ Clinic"}
              </span>
              <a
                href="https://maps.google.com"
                target="_blank"
                className="text-[10px] font-semibold text-secondary hover:text-primary-dark underline cursor-pointer"
              >
                {t("Get Driving Directions")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 13. GLOBAL CALL TO ACTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest block">{t("Begin Your Transformation")}</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-poppins leading-tight">
          {t("Ready to Reveal Your Healthy, Radiant Skin?")}
        </h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
          {t("Book your private consult today with Dr. Aryan Sharma. Together, we will create a tailored clinical path to skin and hair confidence.")}
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={openModal}
            className="px-8 py-4 rounded-full font-bold text-sm text-white btn-gradient shadow-md flex items-center gap-2 cursor-pointer"
          >
            {t("Book Appointment")} <Calendar className="h-4 w-4" />
          </button>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full font-bold text-sm text-slate-700 hover:text-primary border border-slate-200 hover:border-primary bg-white transition-all flex items-center gap-2 cursor-pointer"
          >
            {t("Contact Clinic")}
          </Link>
        </div>
      </section>
    </div>
  );
}
