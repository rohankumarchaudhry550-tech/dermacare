"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
}

export default function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "Before Treatment",
  afterLabel = "After 6 Months",
  title = "Vitiligo Spot Restoration (MKTP Surgery)",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ("clientX" in e) {
      handleMove(e.clientX);
    } else {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full space-y-4">
      {title && (
        <div className="flex justify-between items-center px-2">
          <h4 className="font-semibold text-slate-800 text-base sm:text-lg">{title}</h4>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider bg-accent/40 px-3 py-1 rounded-full">
            Clinical Result
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="relative h-80 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-luxury border border-accent/40 select-none cursor-ew-resize"
      >
        {/* Before Layer (Underlay) */}
        <div className="absolute inset-0 bg-[#e0bba2]">
          {beforeImage ? (
            <img
              src={beforeImage}
              alt="Before Treatment"
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            // Premium SVG Graphic representing skin with Vitiligo white patches (Before)
            <div className="h-full w-full bg-gradient-to-br from-[#dfb194] to-[#cc9d80] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* White patches */}
              <div className="absolute w-36 h-24 rounded-full bg-white/80 blur-md top-1/4 left-1/4 border border-white/20" />
              <div className="absolute w-20 h-20 rounded-full bg-white/75 blur-md bottom-1/4 right-1/3 border border-white/25" />
              <div className="absolute w-12 h-12 rounded-full bg-white/90 blur-sm top-1/2 right-1/4 border border-white/30" />
              
              <div className="relative z-10 space-y-3">
                <div className="w-20 h-20 rounded-full border border-white/40 bg-white/25 flex items-center justify-center mx-auto shadow-sm">
                  <span className="text-white text-xs font-bold font-mono">DEPIGMENT</span>
                </div>
                <h5 className="text-slate-800 font-bold text-sm">Active Leucoderma Patches</h5>
                <p className="text-slate-700 text-xs max-w-xs mx-auto font-medium">
                  Loss of epidermal melanocytes, causing prominent depigmented white skin areas.
                </p>
              </div>
            </div>
          )}
          <span className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md border border-slate-750 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider z-20">
            {beforeLabel}
          </span>
        </div>

        {/* After Layer (Overlay clip-path) */}
        <div
          className="absolute inset-0 bg-[#cfefea] z-10"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {afterImage ? (
            <img
              src={afterImage}
              alt="After Treatment"
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            // Premium SVG Graphic representing fully repigmented, natural uniform skin (After)
            <div className="h-full w-full bg-gradient-to-br from-[#dfb194] to-[#c7987b] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* Restored skin tone - no white patches, subtle glow */}
              <div className="absolute w-48 h-48 rounded-full bg-accent/15 blur-3xl top-1/3 left-1/4 animate-pulse-soft" />

              <div className="relative z-10 space-y-3">
                <div className="w-20 h-20 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center mx-auto">
                  <span className="text-primary-dark text-xs font-bold font-mono">RESTORED</span>
                </div>
                <h5 className="text-slate-800 font-bold text-sm">Melanin Fully Restored</h5>
                <p className="text-slate-700 text-xs max-w-xs mx-auto font-medium">
                  Uniform repigmentation achieved after advanced Melanocyte transplant surgical grafting.
                </p>
              </div>
            </div>
          )}
          <span className="absolute bottom-4 right-4 bg-primary-dark/85 backdrop-blur-md border border-accent/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider z-20">
            {afterLabel}
          </span>
        </div>

        {/* Drag Handle Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-accent/80 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-2 border-accent text-white flex items-center justify-center shadow-lg cursor-ew-resize hover:scale-105 transition-all">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
