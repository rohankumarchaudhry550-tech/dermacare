"use client";

import React, { createContext, useContext, useState } from "react";

interface AppointmentContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AppointmentContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
}
