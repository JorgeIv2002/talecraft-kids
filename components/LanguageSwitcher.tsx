"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  isNightMode?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  isNightMode = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border shadow-2xs transition-colors select-none ${
        isNightMode
          ? "bg-[#1E243A] border-[#313B5E]"
          : "bg-[#FAF7F2] border-[#EFE6DA]"
      } ${className}`}
      title="Cambiar idioma / Switch language"
    >
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`px-2 py-0.5 rounded-full font-display font-extrabold text-[10px] tracking-wider transition-all ${
          locale === "es"
            ? "bg-storybook-coral text-white shadow-2xs scale-102"
            : isNightMode
            ? "text-slate-400 hover:text-white"
            : "text-[#786C60] hover:text-[#2D231B]"
        }`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2 py-0.5 rounded-full font-display font-extrabold text-[10px] tracking-wider transition-all ${
          locale === "en"
            ? "bg-storybook-coral text-white shadow-2xs scale-102"
            : isNightMode
            ? "text-slate-400 hover:text-white"
            : "text-[#786C60] hover:text-[#2D231B]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
