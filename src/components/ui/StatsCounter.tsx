"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatsCounterProps {
  target: number;
  suffix?: string;
  duration?: number; // in ms
}

export default function StatsCounter({ target, suffix = "", duration = 1500 }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
