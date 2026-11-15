"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Moon, Sun, BookOpen, Crown, ShoppingBag } from "lucide-react";
import { ChildProfile } from "@/lib/types";

interface AndroidShellProps {
  children: React.ReactNode;
  profile: ChildProfile;
  isNightMode: boolean;
  onToggleNightMode: () => void;
  activeTab: "library" | "create" | "pro" | "shop";
  onTabChange: (tab: "library" | "create" | "pro" | "shop") => void;
}

export default function AndroidShell({
  children,
  profile,
  isNightMode,
  onToggleNightMode,
  activeTab,
  onTabChange,
}: AndroidShellProps) {
  const [currentTime, setCurrentTime] = useState("19:45");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-4 md:p-8 bg-[#EAE6DF] dark:bg-[#0B0F17] transition-colors duration-300">
      
      {/* Marco de Dispositivo Android (Desktop / Tablet view) */}
      <div
        className={`w-full max-w-[428px] h-screen sm:h-[860px] sm:max-h-[92vh] sm:rounded-[44px] border-0 sm:border-[10px] sm:border-[#1F2421] shadow-2xl relative flex flex-col overflow-hidden transition-colors duration-300 ${
          isNightMode
            ? "bg-[#121824] text-[#E2E8F0] border-[#252E3E]"
            : "bg-[#FDFBF7] text-[#1F2421]"
        }`}
      >
        {/* Notch / Cámara Frontal Punch Hole */}
        <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#1F2421] z-50 pointer-events-none" />

        {/* Barra de Estado Android Superior */}
        <div
          className={`pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-tight z-40 select-none border-b transition-colors ${
            isNightMode
              ? "border-[#1F2838] text-[#94A3B8]"
              : "border-[#F0EBE1] text-[#635F59]"
          }`}
        >
          <span className="font-mono text-xs">{currentTime}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">5G</span>
            <span>📶</span>
            <span>🔋 92%</span>
          </div>
        </div>

        {/* Área de Pantalla Principal con Scroll Suave */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-20 no-scrollbar">
          {children}
        </main>

        {/* Barra de Navegación Inferior Nativa Android */}
        <nav
          className={`absolute bottom-0 left-0 right-0 h-16 px-4 flex items-center justify-around z-40 border-t backdrop-blur-md transition-colors ${
            isNightMode
              ? "bg-[#161F2E]/95 border-[#2D3748] text-[#94A3B8]"
              : "bg-white/95 border-[#EFE9DF] text-[#635F59]"
          }`}
        >
          {/* Tab 1: Cuentos */}
          <button
            onClick={() => onTabChange("library")}
            className={`flex flex-col items-center gap-1 touch-press ${
              activeTab === "library"
                ? "text-storybook-coral font-bold"
                : "hover:text-[#1F2421]"
            }`}
          >
            <BookOpen className="w-5 h-5" strokeWidth={activeTab === "library" ? 2.2 : 1.75} />
            <span className="text-[10px]">Cuentos</span>
          </button>

          {/* Tab 2: Héroe / Crear */}
          <button
            onClick={() => onTabChange("create")}
            className={`flex flex-col items-center gap-1 touch-press ${
              activeTab === "create"
                ? "text-storybook-coral font-bold"
                : "hover:text-[#1F2421]"
            }`}
          >
            <Sparkles className="w-5 h-5" strokeWidth={activeTab === "create" ? 2.2 : 1.75} />
            <span className="text-[10px]">Crear</span>
          </button>

          {/* Tab 3: Bazar de Estrellas */}
          <button
            onClick={() => onTabChange("shop")}
            className={`flex flex-col items-center gap-1 touch-press ${
              activeTab === "shop"
                ? "text-storybook-coral font-bold"
                : "hover:text-[#1F2421]"
            }`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={activeTab === "shop" ? 2.2 : 1.75} />
            <span className="text-[10px]">Bazar ⭐</span>
          </button>

          {/* Botón Central: Modo Noche / Dormir */}
          <button
            onClick={onToggleNightMode}
            className={`flex flex-col items-center gap-1 touch-press ${
              isNightMode ? "text-[#E5A93C] font-bold" : "hover:text-[#1F2421]"
            }`}
          >
            {isNightMode ? (
              <Sun className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Moon className="w-5 h-5" strokeWidth={1.75} />
            )}
            <span className="text-[10px]">{isNightMode ? "Día" : "Noche"}</span>
          </button>

          {/* Tab 4: Membresía Familiar */}
          <button
            onClick={() => onTabChange("pro")}
            className={`flex flex-col items-center gap-1 touch-press ${
              activeTab === "pro"
                ? "text-storybook-coral font-bold"
                : "hover:text-[#1F2421]"
            }`}
          >
            <Crown className="w-5 h-5" strokeWidth={activeTab === "pro" ? 2.2 : 1.75} />
            <span className="text-[10px]">Pase Pro</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
