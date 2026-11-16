"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Moon, Sun, BookOpen, Crown, ShoppingBag, Download } from "lucide-react";
import { ChildProfile } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
  const { t } = useLanguage();

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 bg-[#EBE5DA] dark:bg-[#0D0F1A] transition-colors duration-300">
      
      {/* Barra de Descarga Externa para Navegador / Escritorio */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-2 px-2 select-none">
        <span className="text-xs font-display font-bold text-[#786C60] dark:text-slate-400 flex items-center gap-1.5">
          <span>📱</span> TaleCraft Kids v1.0.0
        </span>
        <a
          href="https://github.com/JorgeIv2002/talecraft-kids/releases/download/v1.0.0/app-android.apk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-[11px] shadow-sm transition-transform hover:scale-105 active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.header.downloadApp}</span>
        </a>
      </div>

      {/* Marco de Dispositivo Android (Estilo Libro de Aventuras) */}
      <div
        className={`w-full max-w-[430px] h-screen sm:h-[860px] sm:max-h-[92vh] sm:rounded-[46px] border-0 sm:border-[9px] sm:border-[#352A20] shadow-[0_25px_60px_-15px_rgba(53,42,32,0.35)] relative flex flex-col overflow-hidden transition-colors duration-300 ${
          isNightMode
            ? "bg-[#141726] text-[#F3F4F6] border-[#252840]"
            : "bg-[#FAF7F2] text-[#2D231B]"
        }`}
      >
        {/* Notch / Cámara Punch Hole */}
        <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#352A20] z-50 pointer-events-none" />

        {/* Barra de Estado Android Superior */}
        <div
          className={`pt-3 px-5 pb-2 flex items-center justify-between text-[11px] font-bold tracking-tight z-40 select-none border-b transition-colors ${
            isNightMode
              ? "border-[#20253B] text-[#9CA3AF]"
              : "border-[#EFE6DA] text-[#786C60]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-xs">{currentTime}</span>
            <LanguageSwitcher isNightMode={isNightMode} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-display">5G</span>
            <span>📶</span>
            <span>🔋 94%</span>
          </div>
        </div>

        {/* Área de Pantalla Principal con Scroll Suave */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-24 no-scrollbar">
          {children}
        </main>

        {/* Barra de Navegación Inferior Flotante y Lúdica */}
        <nav
          className={`absolute bottom-2.5 left-3.5 right-3.5 h-16 px-4 rounded-3xl flex items-center justify-around z-40 border shadow-lg backdrop-blur-md transition-all ${
            isNightMode
              ? "bg-[#1C2035]/95 border-[#2D3352] text-[#9CA3AF]"
              : "bg-white/95 border-[#EFE6DA] text-[#786C60]"
          }`}
        >
          {/* Tab 1: Cuentos */}
          <button
            onClick={() => onTabChange("library")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "library"
                ? "text-storybook-coral font-display font-bold scale-110"
                : "hover:text-[#2D231B]"
            }`}
          >
            <div className={`p-1.5 rounded-2xl ${activeTab === "library" ? "bg-storybook-coralLight" : ""}`}>
              <BookOpen className="w-5 h-5" strokeWidth={activeTab === "library" ? 2.5 : 2} />
            </div>
            <span className="text-[10px]">{t.nav.stories}</span>
          </button>

          {/* Tab 2: Crear */}
          <button
            onClick={() => onTabChange("create")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "create"
                ? "text-storybook-coral font-display font-bold scale-110"
                : "hover:text-[#2D231B]"
            }`}
          >
            <div className={`p-1.5 rounded-2xl ${activeTab === "create" ? "bg-storybook-coralLight" : ""}`}>
              <Sparkles className="w-5 h-5" strokeWidth={activeTab === "create" ? 2.5 : 2} />
            </div>
            <span className="text-[10px]">{t.nav.create}</span>
          </button>

          {/* Tab 3: Bazar */}
          <button
            onClick={() => onTabChange("shop")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "shop"
                ? "text-[#D97706] font-display font-bold scale-110"
                : "hover:text-[#2D231B]"
            }`}
          >
            <div className={`p-1.5 rounded-2xl ${activeTab === "shop" ? "bg-amber-100 dark:bg-amber-950" : ""}`}>
              <ShoppingBag className="w-5 h-5 text-[#D97706]" strokeWidth={activeTab === "shop" ? 2.5 : 2} />
            </div>
            <span className="text-[10px]">{t.nav.shop} ⭐</span>
          </button>

          {/* Botón Central: Dormir / Día */}
          <button
            onClick={onToggleNightMode}
            className={`flex flex-col items-center gap-1 transition-all ${
              isNightMode ? "text-[#FBBF24] font-display font-bold" : "hover:text-[#2D231B]"
            }`}
          >
            <div className="p-1.5 rounded-2xl">
              {isNightMode ? (
                <Sun className="w-5 h-5 text-[#FBBF24] animate-spin-slow" strokeWidth={2.2} />
              ) : (
                <Moon className="w-5 h-5 text-[#4F46E5]" strokeWidth={2} />
              )}
            </div>
            <span className="text-[10px]">{isNightMode ? t.nav.dayMode : t.nav.nightMode}</span>
          </button>

          {/* Tab 4: Pase Pro */}
          <button
            onClick={() => onTabChange("pro")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "pro"
                ? "text-storybook-coral font-display font-bold scale-110"
                : "hover:text-[#2D231B]"
            }`}
          >
            <div className={`p-1.5 rounded-2xl ${activeTab === "pro" ? "bg-storybook-coralLight" : ""}`}>
              <Crown className="w-5 h-5 text-storybook-coral" strokeWidth={activeTab === "pro" ? 2.5 : 2} />
            </div>
            <span className="text-[10px]">{t.nav.pro}</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
