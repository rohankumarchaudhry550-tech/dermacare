"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2, ShieldCheck, Heart, Sparkles, BookOpen, Compass } from "lucide-react";
import doctorData from "@/data/doctors.json";
import Timeline from "@/components/ui/Timeline";

export default function AboutDoctor() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse-soft" />

      <div className="max-w-6xl mx-auto space-y-24">
        {/* 1. Header Profile Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            {/* Visual representation of premium profile */}
            <div className="bg-white rounded-3xl p-4 border border-accent/40 shadow-luxury w-full max-w-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-primary/10 to-secondary/15 rounded-bl-3xl pointer-events-none z-10" />
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative border border-accent/20">
                <img
                  src="/hero-consultation.png"
                  alt="Dr. Aryan Sharma MD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Luxury bottom floating label */}
                <div className="absolute bottom-4 left-4 right-4 glass px-4 py-3 rounded-xl border border-white/20 z-10 text-left">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Chief Consultant</span>
                  <h3 className="font-poppins font-extrabold text-sm text-slate-800">{doctorData.name}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">Senior Specialist</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-poppins leading-[1.15]">
              Meet Dr. Aryan Sharma
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {doctorData.bio}
            </p>
            
            {/* Mission Vision Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-5 rounded-2xl border border-accent/20">
                <h4 className="font-bold font-poppins text-xs text-slate-800 flex items-center gap-1.5 mb-2">
                  <Heart className="h-4 w-4 text-primary" /> Our Mission
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{doctorData.philosophy.mission}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-accent/20">
                <h4 className="font-bold font-poppins text-xs text-slate-800 flex items-center gap-1.5 mb-2">
                  <Compass className="h-4 w-4 text-primary" /> Our Vision
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{doctorData.philosophy.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Degrees & Board Credentials */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-accent/30 shadow-luxury space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins">Academic Degrees & Certifications</h2>
            <p className="text-xs text-slate-500 leading-relaxed">Rigorous qualification credentials verified by leading national and global boards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Degrees */}
            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-2 border-b border-accent/30 pb-2">
                <GraduationCap className="h-5 w-5 text-primary" /> Medical Degrees
              </h3>
              <div className="space-y-4">
                {doctorData.degrees.map((deg, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-bold text-secondary bg-accent/40 px-2 py-0.5 rounded-full mt-0.5">{deg.year}</span>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-850">{deg.degree}</h4>
                      <p className="text-[11px] text-slate-450 mt-0.5">{deg.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-2 border-b border-accent/30 pb-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Specializations & Certs
              </h3>
              <ul className="space-y-3">
                {doctorData.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-650 leading-relaxed">
                    <CheckCircle2 className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Experience Timeline */}
        <section className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Career Journey</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins">Professional Experience Timeline</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Over 15 years of dedicated hospital consulting and advanced surgical practice.</p>
          </div>
          <Timeline events={doctorData.timeline} />
        </section>

        {/* 4. Research, Memberships & Awards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Memberships */}
          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              <BookOpen className="h-5 w-5 text-primary" /> Medical Board Memberships
            </h3>
            <ul className="space-y-3.5">
              {doctorData.memberships.map((member, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                  <span className="h-2 w-2 rounded-full bg-secondary shrink-0 mt-1.5" />
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards */}
          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Award className="h-5 w-5 text-primary" /> Awards & Recognitions
            </h3>
            <div className="space-y-4">
              {doctorData.awards.map((award, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-650">
                  <Award className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">{award.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{award.organization} ({award.year})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Treatment Philosophy */}
        <section className="bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] p-8 md:p-16 text-white text-left relative overflow-hidden shadow-luxury">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Clinic values</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white">Our Treatment Philosophy</h2>
            <p className="text-teal-55 text-xs sm:text-sm leading-relaxed font-light">
              {doctorData.philosophy.philosophy}
            </p>
          </div>
        </section>

        {/* 6. Board Certification Visual Showcase */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins">Clinic Licensing & Certs</h2>
            <p className="text-xs text-slate-500">Official license registrations verifying clinic hygiene and clinical laser capabilities.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "IADVL Board", type: "Active Membership" },
              { title: "MCI Registration", type: "Medical Practitioner" },
              { title: "LHR Safety Cert", type: "Triple-diode laser" },
              { title: "AM Injector", type: "Allergan Certified" },
            ].map((cert, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-accent/20 text-center space-y-2 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-accent/40 text-primary flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-poppins font-bold text-xs text-slate-800">{cert.title}</h4>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">{cert.type}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
