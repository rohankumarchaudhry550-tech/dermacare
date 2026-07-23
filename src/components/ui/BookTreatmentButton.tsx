"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useAppointment } from "@/context/AppointmentContext";

interface BookTreatmentButtonProps {
  treatmentSlug?: string;
  className?: string;
  variant?: "gradient" | "outline" | "secondary";
  children?: React.ReactNode;
}

export default function BookTreatmentButton({
  treatmentSlug,
  className = "",
  variant = "gradient",
  children,
}: BookTreatmentButtonProps) {
  const { openModal } = useAppointment();

  // We could potentially store the selected treatment slug in the state if needed,
  // but for the demo, opening the modal is sufficient.
  
  const baseStyle = "px-6 py-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer";
  
  const styles = {
    gradient: "btn-gradient text-white shadow-md",
    outline: "border border-primary text-primary hover:bg-primary/5 bg-white",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:border-primary",
  };

  return (
    <button
      onClick={openModal}
      className={`${baseStyle} ${styles[variant]} ${className}`}
    >
      {children || (
        <>
          <Calendar className="h-4 w-4" /> Book Appointment
        </>
      )}
    </button>
  );
}
