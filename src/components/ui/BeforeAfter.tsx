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
  afterLabel = "After 4 Sessions",
  title = "Acne Scar Remodeling & Resurfacing",
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
        <div className="absolute inset-0 bg-slate-900">
          {beforeImage ? (
            <img
              src={beforeImage}
              alt="Before Treatment"
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            // Premium SVG Graphic representing skin with blemishes/scar shadows (Before)
            <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-850 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* Blemished mesh pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b6e69_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute w-24 h-24 rounded-full bg-red-500/10 blur-xl top-1/4 left-1/3" />
              <div className="absolute w-32 h-32 rounded-full bg-orange-500/5 blur-2xl bottom-1/3 right-1/4" />
              
              <div className="relative z-10 space-y-3">
                <div className="w-16 h-16 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center mx-auto">
                  <span className="text-red-400 text-xs font-bold font-mono">SCARS</span>
                </div>
                <h5 className="text-slate-400 font-medium text-sm">Blemish & Texture Scars</h5>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  Uneven skin surface with active inflammatory pigmentations and micro-shadowing.
                </p>
              </div>
            </div>
          )}
          <span className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md border border-slate-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider z-20">
            {beforeLabel}
          </span>
        </div>

        {/* After Layer (Overlay clip-path) */}
        <div
          className="absolute inset-0 bg-slate-950 z-10"
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
            // Premium SVG Graphic representing radiant, smoothed glowing skin (After)
            <div className="h-full w-full bg-gradient-to-br from-primary-dark via-primary to-secondary flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* Glowing mesh pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cfefea_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute w-48 h-48 rounded-full bg-accent/20 blur-3xl top-1/3 left-1/4 animate-pulse-soft" />

              <div className="relative z-10 space-y-3">
                <div className="w-16 h-16 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center mx-auto">
                  <span className="text-accent text-xs font-bold font-mono">GLOW</span>
                </div>
                <h5 className="text-accent font-medium text-sm">Smoothed Collagen Restored</h5>
                <p className="text-teal-200/80 text-xs max-w-xs mx-auto">
                  Resurfaced skin layout, optimized sebum balance, and uniform dermal tone.
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
