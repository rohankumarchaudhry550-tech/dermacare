"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, Calendar } from "lucide-react";
import { useAppointment } from "@/context/AppointmentContext";

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useAppointment();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for header background styling and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Treatments", path: "/treatments" },
    { name: "Conditions", path: "/conditions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-poppins font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-0.5">
                DermaCare<span className="text-primary font-light">+</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-secondary font-bold block -mt-1">
                Aesthetic & Skin Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1.5 ${
                    isActive ? "text-primary font-semibold" : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Book Appointment CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={openModal}
              className="px-6 py-3 rounded-full text-xs font-bold text-white btn-gradient flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Calendar className="h-3.5 w-3.5" /> Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-accent/20 shadow-lg p-6 lg:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`py-2 text-base font-semibold tracking-wide border-b border-slate-50 transition-colors ${
                      isActive ? "text-primary pl-1 border-primary/20" : "text-slate-600 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal();
              }}
              className="w-full mt-2 py-3.5 rounded-full text-sm font-bold text-white btn-gradient flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
