"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  // Utility to determine icon based on role/organization keywords
  const getIcon = (role: string, org: string) => {
    const text = (role + " " + org).toLowerCase();
    if (text.includes("resident") || text.includes("md") || text.includes("mbbs") || text.includes("college") || text.includes("science")) {
      return <GraduationCap className="h-4 w-4" />;
    }
    if (text.includes("founder") || text.includes("director") || text.includes("consultant")) {
      return <Briefcase className="h-4 w-4" />;
    }
    return <Award className="h-4 w-4" />;
  };

  return (
    <div className="relative border-l-2 border-accent/60 ml-4 md:ml-32 py-4 space-y-12">
      {events.map((event, index) => (
        <div key={index} className="relative pl-8 md:pl-12">
          {/* Year label for desktop */}
          <div className="hidden md:block absolute -left-36 top-1.5 w-28 text-right">
            <span className="text-sm font-bold text-primary bg-accent/40 px-3 py-1 rounded-full whitespace-nowrap">
              {event.year}
            </span>
          </div>

          {/* Timeline node circle */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
            className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-primary border-4 border-white text-white flex items-center justify-center shadow-md"
          >
            {getIcon(event.role, event.organization)}
          </motion.div>

          {/* Event Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-brand-card p-6 rounded-2xl border border-accent/30 shadow-luxury hover:shadow-luxury-hover hover:border-secondary/30 transition-all duration-300"
          >
            {/* Mobile Year Badge */}
            <span className="inline-block md:hidden text-xs font-bold text-primary bg-accent/40 px-2.5 py-0.5 rounded-full mb-3">
              {event.year}
            </span>
            
            <h4 className="text-base sm:text-lg font-bold text-slate-800">{event.role}</h4>
            <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">{event.organization}</p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{event.description}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
