"use client";

import React, { useState } from "react";
import { Check, Crown, Sparkles, X, ShieldCheck } from "lucide-react";

interface ProMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNightMode: boolean;
}

export default function ProMembershipModal({
  isOpen,
  onClose,
  isNightMode,
}: ProMembershipModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => {
      alert("¡Bienvenido al Club de Cuentos Mágicos Familiar! Tu prueba gratuita de 7 días está activa.");
      setSubscribed(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 ${
          isNightMode
            ? "bg-[#1A2333] border-[#2D3748] text-white"
            : "bg-white border-[#EFE9DF] text-ink-primary"
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-storybook-amber/20 text-[#D97706]">
              <Crown className="w-5 h-5 fill-current" />
            </span>
            <span className="font-display font-extrabold text-sm uppercase tracking-wide text-storybook-coral">
              Pase Familiar
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full touch-press ${
              isNightMode ? "text-slate-400 hover:text-white" : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Título de la Oferta */}
        <div className="space-y-1 text-center">
          <h2 className="font-display font-extrabold text-lg leading-tight">
            Club de Cuentos Mágicos
          </h2>
          <p
            className={`text-xs ${
              isNightMode ? "text-slate-300" : "text-ink-secondary"
            }`}
          >
            Historias ilimitadas donde tus hijos aprenden valores todas las noches.
          </p>
        </div>

        {/* Selector Mensual / Anual */}
        <div className="flex items-center justify-center gap-2 bg-[#F4F1EA] dark:bg-[#121824] p-1 rounded-2xl border border-[#EFE9DF] dark:border-[#2D3748]">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-[#1A2333] shadow-xs text-storybook-coral"
                : "text-ink-secondary dark:text-slate-400"
            }`}
          >
            $6.99 / mes
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              billingCycle === "yearly"
                ? "bg-storybook-coral text-white shadow-xs"
                : "text-ink-secondary dark:text-slate-400"
            }`}
          >
            $49 / año (-40%)
          </button>
        </div>

        {/* Beneficios Clave */}
        <ul className="space-y-2 text-xs">
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>Más de 50 cuentos interactivos con nuevos capítulos cada semana.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>Personalización de hasta 3 niños y sus mascotas en cada cuento.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>Narración por voz suave optimizada para dormir (Modo Noche).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>100% seguro para niños: Cero anuncios y cero compras ocultas.</span>
          </li>
        </ul>

        {/* Botón de Suscripción */}
        <button
          onClick={handleSubscribe}
          disabled={subscribed}
          className="w-full py-3.5 rounded-2xl bg-storybook-coral hover:bg-storybook-coralHover text-white font-display font-bold text-xs shadow-md touch-press transition-all flex items-center justify-center gap-2"
        >
          {subscribed ? (
            <span>Activando Pase Familiar...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Comenzar Prueba Gratuita de 7 Días</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-ink-secondary dark:text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cancela en cualquier momento con un clic.</span>
        </p>
      </div>
    </div>
  );
}
