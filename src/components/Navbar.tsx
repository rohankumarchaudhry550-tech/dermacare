"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { useAppointment } from "@/context/AppointmentContext";
import BrandLogo from "@/components/ui/BrandLogo";

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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-300 rounded-[1.8rem] border ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-accent/45" 
            : "bg-white/90 backdrop-blur-sm border-accent/20"
        } py-3.5`}
      >
        <div className="w-full px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <BrandLogo className="h-full w-full text-primary" />
            </div>
            <div>
              <span className="font-poppins font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-0.5">
                DermaCare<span className="text-primary font-light">+</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-secondary font-bold block -mt-1 opacity-90">
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
                    isActive ? "text-primary font-bold" : "text-slate-600 hover:text-primary"
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
            className="lg:hidden h-11 w-11 rounded-full border border-accent/45 bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center text-slate-700 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer focus:outline-none gap-[4px] relative z-50 overflow-hidden"
          >
            <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5 -translate-x-[2px]'}`} />
            <span className={`block h-[2px] bg-current rounded-full transition-all duration-200 w-5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-3.5 translate-x-[1.5px]'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-50 bg-white border-l border-accent/30 shadow-2xl p-8 lg:hidden flex flex-col justify-between"
            >
              {/* Header inside drawer */}
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center">
                      <BrandLogo className="h-full w-full text-primary" />
                    </div>
                    <span className="font-poppins font-extrabold text-base tracking-tight text-slate-800">
                      DermaCare<span className="text-primary">+</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={link.path}
                          className={`py-3 text-lg font-bold tracking-wide block transition-all ${
                            isActive 
                              ? "text-primary border-b border-primary/20 pl-2 bg-accent/20 rounded-xl px-3" 
                              : "text-slate-650 hover:text-primary pl-2 hover:pl-3"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer info inside drawer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
                className="space-y-6 pt-6 border-t border-accent/20"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal();
                  }}
                  className="w-full py-4 rounded-full text-sm font-bold text-white btn-gradient flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Calendar className="h-4 w-4" /> Book Appointment
                </button>
                <div className="space-y-1.5 text-xs text-slate-400 text-left pl-2">
                  <p className="font-medium text-slate-650">📍 Nariman Point, Mumbai</p>
                  <p className="font-medium text-slate-650">📞 +91 22 5556 7890</p>
                  <p className="text-[10px]">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
