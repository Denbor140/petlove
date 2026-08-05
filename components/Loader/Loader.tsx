"use client";

import { useEffect, useRef, useState } from "react";
import css from "./Loader.module.css";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const raf = requestAnimationFrame(() => setProgress(100));
      return () => cancelAnimationFrame(raf);
    }

    const tick = () => {
      setProgress((prev) => {
        if (prev >= 85) return prev;
        const step = (85 - prev) * 0.02 + 0.3;
        return Math.min(prev + step, 85);
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoading]);

  return (
    <div className={css.loader_container}>
      <div className={css.progress_wrapper}>
        <svg
          width={272}
          height={272}
          viewBox="0 0 272 272"
          fill="none"
          className={css.progress_ring}
        >
          <path
            opacity="0.3"
            d="M1.51415 124.234C-0.93902 152.274 5.43349 180.379 19.7403 204.619C34.0472 228.859 55.5728 248.021 81.3063 259.424C107.04 270.828 135.694 273.903 163.261 268.219C190.829 262.535 215.93 248.377 235.054 227.725C254.178 207.072 266.369 180.959 269.921 153.037C273.473 125.115 268.209 96.781 254.865 71.9982C241.521 47.2154 220.764 27.2233 195.498 14.8183C170.232 2.41325 141.72 -1.78426 113.951 2.81289"
            stroke="url(#paint0_linear_55812_328)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_55812_328"
              x1="124.234"
              y1="270.486"
              x2="-9.90683"
              y2="135.262"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span className={css.progress_text}>{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
