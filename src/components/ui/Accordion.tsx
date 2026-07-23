"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-4">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen
                ? "border-primary bg-primary/[0.02] shadow-sm"
                : "border-slate-200 bg-white hover:border-secondary/40"
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-slate-800 transition-colors focus:outline-none cursor-pointer"
            >
              <span className="text-sm sm:text-base pr-4">{item.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={`h-8 w-8 rounded-full flex items-center justify-center border transition-colors ${
                  isOpen ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
