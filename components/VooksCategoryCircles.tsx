"use client";

import React from "react";
import { Sparkles, Moon, Heart, Headphones, ShoppingBag } from "lucide-react";

interface VooksCategoryCirclesProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenShop: () => void;
  onOpenAudio: () => void;
  isNightMode: boolean;
}

export default function VooksCategoryCircles({
  activeCategory,
  onSelectCategory,
  onOpenShop,
  onOpenAudio,
  isNightMode,
}: VooksCategoryCirclesProps) {
  const categories = [
    {
      id: "Todos",
      label: "Todos",
      icon: "🌟",
      bg: "bg-gradient-to-tr from-[#FF6B4A] to-[#FF8E75]",
      border: "border-[#D94524]",
    },
    {
      id: "bedtime",
      label: "Dormir",
      icon: "🌙",
      bg: "bg-gradient-to-tr from-[#6366F1] to-[#818CF8]",
      border: "border-[#4338CA]",
    },
    {
      id: "values",
      label: "Valores",
      icon: "🦁",
      bg: "bg-gradient-to-tr from-[#10B981] to-[#34D399]",
      border: "border-[#059669]",
    },
    {
      id: "audio",
      label: "Audioteca",
      icon: "🎧",
      bg: "bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8]",
      border: "border-[#0284C7]",
    },
    {
      id: "shop",
      label: "Bazar ⭐",
      icon: "🎁",
      bg: "bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24]",
      border: "border-[#D97706]",
    },
  ];

  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-2 px-1">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => {
              if (cat.id === "shop") {
                onOpenShop();
              } else if (cat.id === "audio") {
                onOpenAudio();
              } else {
                onSelectCategory(cat.id);
              }
            }}
            className="flex flex-col items-center gap-1.5 shrink-0 group select-none touch-press"
          >
            {/* Círculo Vibrante con Sombra Táctil */}
            <div
              className={`w-13 h-13 rounded-full flex items-center justify-center text-xl text-white shadow-sm border-2 ${cat.bg} ${cat.border} transition-transform group-hover:scale-110 active:scale-95 ${
                isActive ? "ring-4 ring-storybook-coral/30 scale-105" : ""
              }`}
            >
              <span>{cat.icon}</span>
            </div>

            <span
              className={`text-[11px] font-display font-bold transition-colors ${
                isActive
                  ? "text-storybook-coral"
                  : isNightMode
                  ? "text-slate-300"
                  : "text-[#6E6259]"
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
