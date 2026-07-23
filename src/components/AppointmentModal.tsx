"use client";

import React from "react";
import { useAppointment } from "@/context/AppointmentContext";
import Modal from "@/components/ui/Modal";
import BookingForm from "@/components/BookingForm";

export default function AppointmentModal() {
  const { isModalOpen, closeModal } = useAppointment();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Schedule a Premium Consultation">
      <div className="bg-slate-50/50 p-4 sm:p-6">
        <BookingForm onSuccess={closeModal} />
      </div>
    </Modal>
  );
}
