"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Crown,
  Sparkles,
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  CreditCard,
  Loader2,
} from "lucide-react";
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
  const [mode, setMode] = useState<"overview" | "parent_gate" | "checkout" | "success">("overview");

  // Control Parental Matemático para Google Play
  const [mathA, setMathA] = useState(4);
  const [mathB, setMathB] = useState(7);
  const [parentAnswer, setParentAnswer] = useState("");
  const [gateError, setGateError] = useState(false);

  // Estado de procesamiento de compra
  const [isProcessing, setIsProcessing] = useState(false);

  // Generar desafío al abrir el gate
  const generateNewGate = () => {
    const a = Math.floor(Math.random() * 6) + 3; // 3 a 8
    const b = Math.floor(Math.random() * 6) + 3; // 3 a 8
    setMathA(a);
    setMathB(b);
    setParentAnswer("");
    setGateError(false);
  };

  useEffect(() => {
    if (isOpen) {
      setMode("overview");
      setGateError(false);
      setParentAnswer("");
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartPurchase = () => {
    generateNewGate();
    setMode("parent_gate");
  };

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = mathA * mathB;
    if (parseInt(parentAnswer.trim(), 10) === expected) {
      setGateError(false);
      setMode("checkout");
    } else {
      setGateError(true);
    }
  };

  const handleConfirmGooglePlayPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onTogglePro(true);
      try {
        localStorage.setItem("talecraft_pro_purchased", "true");
        localStorage.setItem("talecraft_is_pro", "true");
      } catch {}
      setMode("success");
    }, 1300);
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
        {/* ============================================================ */}
        {/* CASO 1: YA COMPRADO Y ACTIVO */}
        {/* ============================================================ */}
        {isPro && mode !== "success" ? (
          <>
            <div className="flex items-center justify-between pb-1 border-b border-inherit">
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

            <div className="p-4 rounded-3xl bg-[#ECFDF5] border-2 border-[#A7F3D0] text-[#065F46] space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981] text-white mx-auto flex items-center justify-center text-2xl shadow-sm">
                👑
              </div>
              <h3 className="font-display font-bold text-sm">{t.pro.activeTitle}</h3>
              <p className="text-xs font-body font-semibold leading-relaxed text-[#047857]">
                {t.pro.activeDesc}
              </p>
            </div>

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

            <div className="pt-2 border-t border-inherit space-y-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl btn-toy-coral bg-storybook-coral text-white font-display font-bold text-xs shadow-md"
              >
                {locale === "en" ? "Continue Enjoying Pro ✨" : "Continuar Disfrutando de Pro ✨"}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-display font-bold text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.pro.manageSub}</span>
              </div>
            </div>
          </>
        ) : mode === "parent_gate" ? (
          /* ============================================================ */
          /* CASO 2: CONTROL PARENTAL REQUERIDO PARA COMPRA */
          /* ============================================================ */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-inherit">
              <button
                onClick={() => setMode("overview")}
                className="flex items-center gap-1 text-xs font-display font-bold text-storybook-coral"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{locale === "en" ? "Back" : "Volver"}</span>
              </button>
              <span className="font-display font-bold text-xs flex items-center gap-1 text-amber-600">
                <Lock className="w-3.5 h-3.5" />
                <span>{t.pro.parentGateTitle}</span>
              </span>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-full transition-transform active:scale-95 ${
                  isNightMode ? "text-slate-400 hover:text-white" : "text-[#786C60] hover:text-[#2D231B]"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-1.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center text-xl shadow-xs">
                👨‍👩‍👧
              </div>
              <h3 className="font-display font-bold text-sm">
                {locale === "en" ? "Adult Verification" : "Verificación de Adulto"}
              </h3>
              <p className="text-xs font-body font-semibold text-[#786C60] dark:text-slate-400">
                {t.pro.parentGateDesc}
              </p>
            </div>

            <form onSubmit={handleVerifyGate} className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#141726] border-2 border-[#EFE6DA] dark:border-[#2D3352] text-center space-y-2">
                <span className="font-display font-black text-2xl text-storybook-coral tracking-widest">
                  {mathA} × {mathB} = ?
                </span>
                <input
                  type="number"
                  autoFocus
                  required
                  value={parentAnswer}
                  onChange={(e) => {
                    setParentAnswer(e.target.value);
                    setGateError(false);
                  }}
                  placeholder={locale === "en" ? "Your answer" : "Tu respuesta"}
                  className="w-full text-center p-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 font-display font-bold text-lg bg-white dark:bg-[#1C2035] outline-none focus:border-storybook-coral"
                />
              </div>

              {gateError && (
                <p className="text-xs font-body font-bold text-red-500 text-center animate-shake">
                  {t.pro.parentGateError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-md transition-all"
              >
                {locale === "en" ? "Continue to Payment →" : "Continuar al Pago →"}
              </button>
            </form>
          </div>
        ) : mode === "checkout" ? (
          /* ============================================================ */
          /* CASO 3: PASARELA DE PAGO GOOGLE PLAY */
          /* ============================================================ */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-inherit">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">▶️</span>
                <span className="font-display font-extrabold text-xs text-[#0F9D58] tracking-wider uppercase">
                  Google Play
                </span>
              </div>
              <button
                onClick={() => setMode("overview")}
                className={`p-1.5 rounded-full transition-transform active:scale-95 ${
                  isNightMode ? "text-slate-400 hover:text-white" : "text-[#786C60] hover:text-[#2D231B]"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-[#141726] border-2 border-slate-200 dark:border-[#2D3352] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm">TaleCraft Kids</h4>
                  <p className="text-[11px] font-body text-slate-500 dark:text-slate-400">
                    {billingCycle === "yearly"
                      ? locale === "en"
                        ? "Family Pro (Yearly Subscription)"
                        : "Pase Familiar Pro (Anual)"
                      : locale === "en"
                      ? "Family Pro (Monthly Subscription)"
                      : "Pase Familiar Pro (Mensual)"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-base text-emerald-600 dark:text-emerald-400">
                    {billingCycle === "yearly" ? "$49.00 USD" : "$6.99 USD"}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {billingCycle === "yearly"
                      ? locale === "en"
                        ? "/ year"
                        : "/ año"
                      : locale === "en"
                      ? "/ month"
                      : "/ mes"}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#1C2035] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-display font-bold">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span>Google Pay (•••• 4821)</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">✓ Listo</span>
              </div>

              <p className="text-[10px] font-body text-slate-500 leading-snug">
                {locale === "en"
                  ? "Subscription automatically renews. You can cancel anytime from Google Play > Subscriptions."
                  : "Suscripción con renovación automática. Puedes cancelarla cuando quieras desde Google Play > Suscripciones."}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleConfirmGooglePlayPurchase}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-[#0F9D58] hover:bg-[#0B8043] text-white font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{locale === "en" ? "Processing purchase..." : "Procesando compra segura..."}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{locale === "en" ? "Confirm & Subscribe" : "Confirmar y Suscribirme"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode("overview")}
                disabled={isProcessing}
                className="w-full py-2 text-xs font-display font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                {locale === "en" ? "Cancel" : "Cancelar"}
              </button>
            </div>
          </div>
        ) : mode === "success" ? (
          /* ============================================================ */
          /* CASO 4: COMPRA CONFIRMADA EXITOSAMENTE */
          /* ============================================================ */
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-3xl bg-emerald-500 text-white mx-auto flex items-center justify-center text-3xl shadow-md animate-bounce">
              🎉
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-base text-emerald-700 dark:text-emerald-300">
                {locale === "en" ? "Pro Pass Activated!" : "¡Pase Familiar Pro Activado!"}
              </h3>
              <p className="text-xs font-body font-semibold text-[#786C60] dark:text-slate-300">
                {locale === "en"
                  ? "Thank you for purchasing TaleCraft Kids Pro. All stories, multi-child and custom creator are now unlocked."
                  : "Gracias por apoyar la lectura mágica. Todos los cuentos, perfiles y el creador de historias están disponibles."}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl btn-toy-coral bg-storybook-coral text-white font-display font-bold text-xs shadow-md"
            >
              {locale === "en" ? "Start Exploring Now ✨" : "Comenzar a Disfrutar ✨"}
            </button>
          </div>
        ) : (
          /* ============================================================ */
          /* CASO 5: PAYWALL OFICIAL (OVERVIEW) */
          /* ============================================================ */
          <>
            <div className="flex items-center justify-between pb-1 border-b border-inherit">
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

            {/* Selector de Plan Mensual / Anual */}
            <div className="flex items-center justify-center gap-2 bg-[#FAF7F2] dark:bg-[#141726] p-1.5 rounded-2xl border-2 border-[#EFE6DA] dark:border-[#2D3352]">
              <button
                type="button"
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
                type="button"
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

            {/* Lista de Beneficios Exclusivos Pro */}
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

            {/* Botón de Compra con Google Play */}
            <button
              onClick={handleStartPurchase}
              className="w-full py-4 rounded-2xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.pro.freeTrialButton}</span>
            </button>

            <p className="text-[11px] font-body text-center text-[#786C60] dark:text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.pro.noChargeNow}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
