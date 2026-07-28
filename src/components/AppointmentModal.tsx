"use client";

import React from "react";
import { useAppointment } from "@/context/AppointmentContext";
import Modal from "@/components/ui/Modal";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/context/LanguageContext";

export default function AppointmentModal() {
  const { isModalOpen, closeModal } = useAppointment();
  const { t } = useLanguage();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title={t("Schedule a Premium Consultation")}>
      <div className="bg-slate-50/50 p-4 sm:p-6">
        <BookingForm onSuccess={closeModal} />
      </div>
    </Modal>
  );
}
