"use client";

import React, { useState } from "react";
import { Check, Crown, Sparkles, X, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNightMode: boolean;
  isPro: boolean;
  onTogglePro: (active: boolean) => void;
}

export default function ProMembershipModal({
  isOpen,
  onClose,
  isNightMode,
  isPro,
  onTogglePro,
}: ProMembershipModalProps) {
  const { t, locale } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [justActivated, setJustActivated] = useState(false);

  if (!isOpen) return null;

  const handleActivatePro = () => {
    onTogglePro(true);
    setJustActivated(true);
    setTimeout(() => {
      setJustActivated(false);
      onClose();
    }, 1400);
  };

  const handleDeactivatePro = () => {
    onTogglePro(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm rounded-[36px] p-6 border-2 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 ${
          isNightMode
            ? "bg-[#1C2035] border-[#2D3352] text-white"
            : "bg-white border-[#EFE6DA] text-[#2D231B]"
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-amber-100 text-[#D97706]">
              <Crown className="w-5 h-5 fill-current" />
            </span>
            <span className="font-display font-extrabold text-sm uppercase tracking-wide text-storybook-coral">
              {t.pro.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-transform active:scale-95 ${
              isNightMode ? "text-slate-400 hover:text-white" : "text-[#786C60] hover:text-[#2D231B]"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Estado o Título */}
        {isPro ? (
          <div className="p-4 rounded-3xl bg-[#ECFDF5] border-2 border-[#A7F3D0] text-[#065F46] space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981] text-white mx-auto flex items-center justify-center text-2xl shadow-sm">
              👑
            </div>
            <h3 className="font-display font-bold text-sm">{t.pro.activeTitle}</h3>
            <p className="text-xs font-body font-semibold leading-relaxed text-[#047857]">
              {t.pro.activeDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <h2 className="font-display font-bold text-xl leading-tight">
              {t.pro.title}
            </h2>
            <p
              className={`text-xs font-body font-semibold ${
                isNightMode ? "text-slate-300" : "text-[#786C60]"
              }`}
            >
              {t.pro.subtitle}
            </p>
          </div>
        )}

        {/* Selector Mensual / Anual */}
        {!isPro && (
          <div className="flex items-center justify-center gap-2 bg-[#FAF7F2] dark:bg-[#141726] p-1.5 rounded-2xl border-2 border-[#EFE6DA] dark:border-[#2D3352]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 py-2 rounded-xl text-xs font-display font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-[#1E2238] shadow-xs text-storybook-coral"
                  : "text-[#786C60] dark:text-slate-400"
              }`}
            >
              {locale === "en" ? "$6.99 / mo" : "$6.99 / mes"}
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex-1 py-2 rounded-xl text-xs font-display font-bold transition-all ${
                billingCycle === "yearly"
                  ? "bg-storybook-coral text-white shadow-xs"
                  : "text-[#786C60] dark:text-slate-400"
              }`}
            >
              {locale === "en" ? "$49 / yr (-40%)" : "$49 / año (-40%)"}
            </button>
          </div>
        )}

        {/* Beneficios */}
        <ul className="space-y-2 text-xs font-body font-semibold">
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>{t.pro.feat1Title}</strong> {t.pro.feat1Desc}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>{t.pro.feat2Title}</strong> {t.pro.feat2Desc}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>{t.pro.feat3Title}</strong> {t.pro.feat3Desc}
            </span>
          </li>
        </ul>

        {/* Acciones */}
        {isPro ? (
          <div className="space-y-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl btn-toy-coral bg-storybook-coral text-white font-display font-bold text-xs shadow-md"
            >
              {locale === "en" ? "Continue Enjoying Pro ✨" : "Continuar Disfrutando de Pro ✨"}
            </button>
            <button
              onClick={handleDeactivatePro}
              className="w-full py-2 rounded-xl text-xs font-display font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.pro.switchFree}</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleActivatePro}
            disabled={justActivated}
            className="w-full py-4 rounded-2xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            {justActivated ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                <span>
                  {locale === "en" ? "Pro Pass Activated! Enjoy 🎉" : "¡Pase Pro Activado! Disfrútalo 🎉"}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {locale === "en" ? "Start 7-Day Free Trial" : "Activar Prueba Gratuita de 7 Días"}
                </span>
              </>
            )}
          </button>
        )}

        <p className="text-[11px] font-body text-center text-[#786C60] dark:text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.pro.noChargeNow}</span>
        </p>
      </div>
    </div>
  );
}
