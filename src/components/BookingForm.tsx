"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import treatmentsData from "@/data/treatments.json";
import { useLanguage } from "@/context/LanguageContext";

interface BookingFormProps {
  onSuccess?: () => void;
  preselectedTreatment?: string;
}

export default function BookingForm({ onSuccess, preselectedTreatment }: BookingFormProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    treatment: preselectedTreatment || "",
    doctor: "Dr. Aryan Sharma",
    date: "",
    timeSlot: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingCode, setBookingCode] = useState("");

  // Categories extracted from treatments
  const categories = Array.from(new Set(treatmentsData.map((t) => t.category)));

  // Filtered treatments based on selected category
  const filteredTreatments = treatmentsData.filter(
    (t) => !formData.category || t.category === formData.category
  );

  // If preselected treatment is provided, set the category automatically
  useEffect(() => {
    if (preselectedTreatment) {
      const treatmentObj = treatmentsData.find((t) => t.slug === preselectedTreatment);
      if (treatmentObj) {
        setFormData((prev) => ({
          ...prev,
          treatment: preselectedTreatment,
          category: treatmentObj.category,
        }));
      }
    }
  }, [preselectedTreatment]);

  // Generate future dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      if (futureDate.getDay() !== 0) { // Exclude Sundays
        dates.push({
          value: futureDate.toISOString().split("T")[0],
          label: futureDate.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
        });
      }
    }
    return dates;
  };

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSelectTreatment = (slug: string, category: string) => {
    setFormData((prev) => ({ ...prev, treatment: slug, category }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.treatment;
      return copy;
    });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.treatment) newErrors.treatment = language === "hi" ? "कृपया एक उपचार सेवा चुनें" : "Please select a treatment service";
    } else if (step === 2) {
      if (!formData.date) newErrors.date = language === "hi" ? "कृपया अपॉइंटमेंट की तारीख चुनें" : "Please select an appointment date";
      if (!formData.timeSlot) newErrors.timeSlot = language === "hi" ? "कृपया एक समय स्लॉट चुनें" : "Please choose a preferred time slot";
    } else if (step === 3) {
      if (!formData.name.trim()) newErrors.name = language === "hi" ? "पूरा नाम आवश्यक है" : "Full name is required";
      if (!formData.phone.trim()) {
        newErrors.phone = language === "hi" ? "फ़ोन नंबर आवश्यक है" : "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ""))) {
        newErrors.phone = language === "hi" ? "कृपया एक मान्य 10-अंकीय फ़ोन नंबर दर्ज करें" : "Please enter a valid 10-digit phone number";
      }
      if (!formData.email.trim()) {
        newErrors.email = language === "hi" ? "ईमेल पता आवश्यक है" : "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = language === "hi" ? "कृपया एक मान्य ईमेल पता दर्ज करें" : "Please enter a valid email address";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Generate booking code: DC-XXXXX
      const code = `DC-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingCode(code);
      setStep(4);
      if (onSuccess) {
        setTimeout(onSuccess, 5000); // Close modal automatically after 5s if inside modal
      }
    }
  };

  const selectedTreatmentObject = treatmentsData.find((t) => t.slug === formData.treatment);
  const selectedTreatmentName = selectedTreatmentObject ? t(selectedTreatmentObject.title) : "";

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-card rounded-3xl border border-accent/40 shadow-luxury overflow-hidden">
      {/* Step Indicator Header */}
      {step < 4 && (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-8 py-6 border-b border-accent/30 flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              {t("Step")} {step} {t("of")} 3
            </span>
            <h3 className="text-lg font-semibold text-slate-800">
              {step === 1 && t("Select Treatment")}
              {step === 2 && t("Choose Date & Time")}
              {step === 3 && t("Personal Information")}
            </h3>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? "w-6 bg-primary" : s < step ? "w-2 bg-secondary" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">{t("Category Filter")}</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, category: "", treatment: "" }))}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      !formData.category
                        ? "bg-primary text-white"
                        : "bg-accent/40 text-primary-dark hover:bg-accent/60"
                    }`}
                  >
                    {t("All Services")}
                  </button>
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat, treatment: "" }))}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        formData.category === cat
                          ? "bg-primary text-white"
                          : "bg-accent/40 text-primary-dark hover:bg-accent/60"
                      }`}
                    >
                      {t(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatments Selector Grid */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-3">{t("Select Specific Service")}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 border border-slate-100 rounded-2xl p-2 bg-slate-50/50">
                  {filteredTreatments.map((tr) => (
                    <div
                      key={tr.slug}
                      onClick={() => handleSelectTreatment(tr.slug, tr.category)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        formData.treatment === tr.slug
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "bg-white border-slate-200 hover:border-secondary/40"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm text-slate-800">{t(tr.title)}</h4>
                          {formData.treatment === tr.slug && (
                            <span className="h-4 w-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{t(tr.shortDescription)}</p>
                      </div>
                      <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider mt-3 block">{t(tr.category)}</span>
                    </div>
                  ))}
                </div>
                {errors.treatment && <p className="text-xs text-red-500 mt-2">{errors.treatment}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-full text-sm font-medium text-white btn-gradient flex items-center gap-2 cursor-pointer"
                >
                  {t("Continue")} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Doctor Display */}
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex gap-4 items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  AS
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Dr. Aryan Sharma</h4>
                  <p className="text-xs text-secondary">{t("MD - Dermatology | Hair & Aesthetic Specialist") || "MD - त्वचा रोग | बाल और एस्थेटिक विशेषज्ञ"}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" /> {t("Select Appointment Date")}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {getAvailableDates().map((d) => (
                    <div
                      key={d.value}
                      onClick={() => setFormData((p) => ({ ...p, date: d.value }))}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all duration-200 ${
                        formData.date === d.value
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white border-slate-200 hover:border-secondary/40"
                      }`}
                    >
                      <p className="text-xs font-semibold">{d.label.split(",")[0]}</p>
                      <p className="text-[10px] opacity-75 mt-0.5">{d.label.split(" ")[1]} {d.label.split(" ")[2]}</p>
                    </div>
                  ))}
                </div>
                {errors.date && <p className="text-xs text-red-500 mt-2">{errors.date}</p>}
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> {t("Select Preferred Time Slot")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      onClick={() => setFormData((p) => ({ ...p, timeSlot: slot }))}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                        formData.timeSlot === slot
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white border-slate-200 hover:border-secondary/40"
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full ${formData.timeSlot === slot ? "bg-white" : "bg-secondary"}`} />
                      <span className="text-xs font-medium">{slot}</span>
                    </div>
                  ))}
                </div>
                {errors.timeSlot && <p className="text-xs text-red-500 mt-2">{errors.timeSlot}</p>}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> {t("Back")}
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-full text-sm font-medium text-white btn-gradient flex items-center gap-2 cursor-pointer"
                >
                  {t("Continue")} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {/* Form Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                    <User className="h-4 w-4 text-primary" /> {t("Full Name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("Enter your full name")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-primary" /> {t("Mobile Number")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t("10-digit mobile number")}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-primary" /> {t("Email Address")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-primary" /> {t("Symptoms or Special Requests (Optional)")}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder={t("Briefly describe your skin/hair concern or any medical conditions...")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm bg-slate-50/50 resize-none"
                  />
                </div>
              </div>

              {/* Summary card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-600">
                <p className="flex justify-between">
                  <span className="font-medium">{t("Selected Service:")}</span> 
                  <span className="font-semibold text-slate-800">{selectedTreatmentName}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">{t("Specialist:")}</span> 
                  <span className="font-semibold text-slate-800">{formData.doctor}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">{t("Date & Time:")}</span> 
                  <span className="font-semibold text-slate-800">
                    {new Date(formData.date).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })} {t("at")} {formData.timeSlot.split(" - ")[0]}
                  </span>
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> {t("Back")}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white btn-gradient flex items-center gap-2 cursor-pointer shadow-md"
                >
                  {t("Confirm & Book Slot") || t("Confirm & Schedule")} <CheckCircle className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 bg-accent/30 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse-soft">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800">{t("Appointment Confirmed!")}</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  {t("Thank you") || "धन्यवाद"}, <span className="font-semibold text-slate-700">{formData.name}</span>. {t("Your slot has been reserved successfully. Our coordinator will contact you shortly to confirm travel and directions.") || t("Your luxury consultation has been successfully scheduled.")}
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl max-w-md mx-auto space-y-3 text-sm text-slate-700">
                <div className="flex justify-between pb-2 border-b border-primary/10">
                  <span className="text-slate-500">{t("Booking Reference")}</span>
                  <span className="font-bold text-primary tracking-wider">{bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("Procedure")}</span>
                  <span className="font-medium text-slate-800 text-right">{selectedTreatmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("Date")}</span>
                  <span className="font-medium text-slate-800">
                    {new Date(formData.date).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("Time Window")}</span>
                  <span className="font-medium text-slate-800">{formData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("Clinic Coordinator")}</span>
                  <span className="font-medium text-slate-800">{formData.doctor}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {t("A confirmation SMS and WhatsApp invite with clinic location details and pre-procedure guidelines has been sent to your registered number.") || "एक पुष्टि संदेश और व्हाट्सएप आमंत्रण आपके पंजीकृत नंबर पर भेज दिया गया है।"}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      category: "",
                      treatment: "",
                      doctor: "Dr. Aryan Sharma",
                      date: "",
                      timeSlot: "",
                      name: "",
                      phone: "",
                      email: "",
                      notes: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-primary border border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  {t("Schedule Another Appointment") || "दूसरा अपॉइंटमेंट बुक करें"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
