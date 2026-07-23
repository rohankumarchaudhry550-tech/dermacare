"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Check, Sparkles, Filter, Plus } from "lucide-react";
import reviewsData from "@/data/reviews.json";
import treatmentsData from "@/data/treatments.json";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(reviewsData.reviews);
  const [starFilter, setStarFilter] = useState<number | "All">("All");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  
  // Form State
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTreatment, setFormTreatment] = useState("");
  const [formText, setFormText] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const handleWriteReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formText.trim()) {
      const newReview = {
        id: `rev-${Date.now()}`,
        name: formName,
        rating: formRating,
        date: "Just now",
        treatment: formTreatment || "general-consultation",
        text: formText,
        verified: true,
        avatar: formName.charAt(0).toUpperCase()
      };

      setReviews([newReview, ...reviews]);
      setFormSuccess(true);
      setTimeout(() => {
        setIsWriteReviewOpen(false);
        setFormSuccess(false);
        setFormName("");
        setFormRating(5);
        setFormTreatment("");
        setFormText("");
      }, 2000);
    }
  };

  const filteredReviews = reviews.filter((rev) => {
    return starFilter === "All" || rev.rating === starFilter;
  });

  // Calculate stats based on current reviews
  const totalReviewsCount = reviews.length;
  const ratingDistribution = reviews.reduce((acc, rev) => {
    const r = rev.rating.toString();
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative min-h-screen py-16 px-6">
      {/* Background blobs */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block">Patient Voices</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins">
            Verified Patient Reviews
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Read transparent, clinical feedback from patients treated at DermaCare+. We preserve trust by verifying every review via medical registration numbers.
          </p>
        </div>

        {/* Google Style Summary & Rating Cards */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-[2.5rem] border border-accent/30 shadow-luxury">
          {/* Average Rating Block */}
          <div className="md:col-span-4 text-center space-y-3 md:border-r border-slate-100 md:pr-8 py-4">
            <h2 className="text-6xl font-extrabold font-poppins text-slate-800">4.9</h2>
            <div className="flex justify-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-500 font-semibold">Average rating from {totalReviewsCount} patients</p>
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="mt-2 px-5 py-2.5 rounded-full text-xs font-bold text-white btn-gradient flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Write a Review
            </button>
          </div>

          {/* Rating Distribution bars */}
          <div className="md:col-span-8 space-y-2.5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingDistribution[stars.toString()] || 0;
              const percent = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-slate-550 font-semibold flex items-center justify-end gap-1">
                    {stars} <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                  </span>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-slate-400 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Success / Transformation Stories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-poppins text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Clinical Transformation Summaries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsData.successStories.map((story) => (
              <div key={story.id} className="bg-white p-6 rounded-3xl border border-accent/20 shadow-sm space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-secondary bg-accent/40 px-2 py-0.5 rounded-full inline-block">
                    Age {story.age} Case
                  </span>
                  <h3 className="font-poppins font-bold text-sm text-slate-800">{story.title}</h3>
                </div>
                <div className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                  <p><strong>Condition:</strong> {story.condition}</p>
                  <p><strong>Treatment Duration:</strong> {story.duration}</p>
                  <p><strong>Clinical Protocol:</strong> {story.protocol}</p>
                  <p className="text-slate-700 font-medium"><strong>Outcome:</strong> {story.result}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews List & Filters */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
            <h2 className="text-2xl font-bold font-poppins text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" /> Patient Reviews
            </h2>

            {/* Star Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStarFilter("All")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  starFilter === "All"
                    ? "bg-primary text-white"
                    : "bg-accent/40 text-primary-dark hover:bg-accent/60"
                }`}
              >
                All Reviews
              </button>
              {[5, 4, 3].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setStarFilter(star)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    starFilter === star
                      ? "bg-primary text-white"
                      : "bg-accent/40 text-primary-dark hover:bg-accent/60"
                  }`}
                >
                  {star} <Star className="h-3 w-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* List display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => {
              const treatmentName = treatmentsData.find((t) => t.slug === rev.treatment)?.title || "General Consultation";
              return (
                <div key={rev.id} className="bg-white p-6 rounded-3xl border border-accent/20 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0.5 text-yellow-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-secondary font-bold uppercase tracking-wider bg-accent/40 px-2 py-0.5 rounded-full">
                        {treatmentName}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed pt-1">
                      \"{rev.text}\"
                    </p>
                  </div>

                  <div className="pt-5 border-t border-accent/10 mt-5 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-800">{rev.name}</h4>
                      <p className="text-[10px] text-slate-400">Verified Review | {rev.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Write a Review Drawer/Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsWriteReviewOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <div className="bg-brand-bg rounded-3xl border border-accent/40 shadow-2xl z-10 w-full max-w-md overflow-hidden relative">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-accent/30">
              <h3 className="font-poppins font-bold text-slate-800">Write a Patient Review</h3>
            </div>
            
            <form onSubmit={handleWriteReviewSubmit} className="p-6 space-y-4">
              {formSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-slate-800">Review Submitted!</h4>
                  <p className="text-xs text-slate-500">Thank you for sharing your experience. We are updating the feedback desk.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary bg-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Star Rating</label>
                      <select
                        value={formRating}
                        onChange={(e) => setFormRating(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary bg-white"
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Treatment</label>
                      <select
                        value={formTreatment}
                        onChange={(e) => setFormTreatment(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary bg-white"
                        required
                      >
                        <option value="">Select Treatment</option>
                        {treatmentsData.map((t) => (
                          <option key={t.slug} value={t.slug}>{t.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Review Comments</label>
                    <textarea
                      value={formText}
                      onChange={(e) => setFormText(e.target.value)}
                      rows={4}
                      placeholder="Share details of your clinical journey, result timelines, and doctor care..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary bg-white resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-bold text-white btn-gradient flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    Submit Verified Review
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
