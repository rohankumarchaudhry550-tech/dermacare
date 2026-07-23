import React from "react";

export default function BrandLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" stroke="url(#logo-gold-grad)" strokeWidth="2" strokeOpacity="0.6" />
      {/* Inner geometric gold cross */}
      <path
        d="M50 20 V80 M20 50 H80"
        stroke="url(#logo-gold-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Intertwined luxury curved lines */}
      <path
        d="M38 34 C42 28, 58 28, 62 34 C66 40, 66 60, 62 66 C58 72, 42 72, 38 66"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Micro accent dot */}
      <circle cx="50" cy="50" r="3" fill="currentColor" />
      
      <defs>
        <linearGradient id="logo-gold-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" /> {/* Metallic Gold */}
          <stop offset="30%" stopColor="#FFFDD0" /> {/* Cream Highlight */}
          <stop offset="70%" stopColor="#AA7C11" /> {/* Dark Bronze */}
          <stop offset="100%" stopColor="#F3E5AB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
