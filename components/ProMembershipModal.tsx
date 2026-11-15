"use client";

import React, { useState } from "react";
import { Check, Crown, Sparkles, X, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";

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
              Pase Familiar Pro
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

        {/* Título de la Oferta o Estado Activo */}
        {isPro ? (
          <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] space-y-2 text-center">
            <div className="w-10 h-10 rounded-full bg-[#10B981] text-white mx-auto flex items-center justify-center text-xl shadow-xs">
              👑
            </div>
            <h3 className="font-display font-bold text-sm">¡Tu Pase Familiar Pro está ACTIVO!</h3>
            <p className="text-xs leading-relaxed text-[#047857]">
              Tienes acceso ilimitado a todos los cuentos exclusivos, perfiles para hasta 3 niños y el generador de historias personalizadas.
            </p>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <h2 className="font-display font-extrabold text-lg leading-tight">
              Club de Cuentos Mágicos
            </h2>
            <p
              className={`text-xs ${
                isNightMode ? "text-slate-300" : "text-ink-secondary"
              }`}
            >
              Desbloquea todas las aventuras y funciones familiares para tus pequeños.
            </p>
          </div>
        )}

        {/* Selector Mensual / Anual (sólo si no es Pro) */}
        {!isPro && (
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
        )}

        {/* Beneficios Clave con Check */}
        <ul className="space-y-2 text-xs">
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>
              <strong>Cuentos Exclusivos Desbloqueados:</strong> Acceso a toda la biblioteca sin candados.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>
              <strong>Multi-Hijo:</strong> Perfiles independientes para hasta 3 niños con sus propias estrellas.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>
              <strong>Creador de Cuentos Mágicos:</strong> Genera cuentos interactivos a medida con cualquier valor.
            </span>
          </li>
        </ul>

        {/* Botón de Acción */}
        {isPro ? (
          <div className="space-y-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-storybook-coral text-white font-display font-bold text-xs shadow-md touch-press"
            >
              Continuar Disfrutando de Pro ✨
            </button>
            <button
              onClick={handleDeactivatePro}
              className="w-full py-2 rounded-xl text-xs text-slate-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Volver al Modo Gratuito (para probar diferencias)</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleActivatePro}
            disabled={justActivated}
            className="w-full py-3.5 rounded-2xl bg-storybook-coral hover:bg-storybook-coralHover text-white font-display font-bold text-xs shadow-md touch-press transition-all flex items-center justify-center gap-2"
          >
            {justActivated ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                <span>¡Pase Pro Activado! Disfrútalo 🎉</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Activar Prueba Gratuita de 7 Días</span>
              </>
            )}
          </button>
        )}

        <p className="text-[10px] text-center text-ink-secondary dark:text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sin compromisos: alterna o prueba libremente en cualquier momento.</span>
        </p>
      </div>
    </div>
  );
}
