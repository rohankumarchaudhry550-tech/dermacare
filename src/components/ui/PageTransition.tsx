"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth transition timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center text-white"
        >
          <div className="space-y-6 text-center max-w-sm px-6">
            {/* Animated brand emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-16 w-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg relative"
            >
              <div className="absolute inset-0 bg-primary rounded-2xl blur-md opacity-40 animate-pulse" />
              <span className="text-white font-serif font-extrabold text-2xl relative z-10">+</span>
            </motion.div>
            
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-poppins font-bold text-2xl tracking-wide bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent"
              >
                DermaCare+
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4 }}
                className="text-[10px] uppercase tracking-widest font-medium text-slate-400"
              >
                Dr. Aryan Sharma • Mumbai
              </motion.p>
            </div>
            
            {/* Ultra-smooth progress line */}
            <div className="w-48 h-[2px] bg-slate-800 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-full w-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
