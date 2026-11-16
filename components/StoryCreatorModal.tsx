"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, X, BookPlus, CheckCircle2, Globe, Loader2 } from "lucide-react";
import { Story, ValueCategory, ChildProfile } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface StoryCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNightMode: boolean;
  isPro: boolean;
  onRequestPro: () => void;
  onStoryCreated: (newStory: Story) => void;
  profile?: ChildProfile;
}

export default function StoryCreatorModal({
  isOpen,
  onClose,
  isNightMode,
  isPro,
  onRequestPro,
  onStoryCreated,
  profile,
}: StoryCreatorModalProps) {
  const { t, locale } = useLanguage();
  const [topic, setTopic] = useState("");
  const [valueCategory, setValueCategory] = useState<ValueCategory>("Valentía");
  const [emoji, setEmoji] = useState("🐻");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGenerationStep(
      locale === "en"
        ? "Imagining a deep bedtime adventure..."
        : "Imaginando una aventura profunda de cuna..."
    );

    try {
      // 1. Llamar al generador de historias ricas y adaptativas
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          childName: profile?.name || "Pequeño Aventurero",
          childAge: profile?.age || 5,
          petName: profile?.petName || "Chispas",
          valueCategory,
          emoji,
          locale,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo generar el cuento");
      }

      const data = await res.json();
      const generatedStory: Story = data.story;

      // 2. Publicar en la biblioteca comunitaria online para todos
      setGenerationStep(
        locale === "en"
          ? "Publishing online for all families..."
          : "Publicando online para todas las familias..."
      );

      try {
        await fetch("/api/community-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(generatedStory),
        });
      } catch (pubErr) {
        console.warn("No se pudo sincronizar en la nube en este instante:", pubErr);
      }

      onStoryCreated(generatedStory);
      setTopic("");
      onClose();
    } catch (err) {
      console.error("Error en la creación del cuento:", err);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
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
        {/* Cabecera del Creador */}
        <div className="flex items-center justify-between pb-1 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <Wand2 className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-bold text-base">{t.create.title}</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[10px] font-display font-bold flex items-center gap-1">
                <Globe className="w-2.5 h-2.5" />
                <span>Online & Free</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className={`p-1.5 rounded-full transition-transform active:scale-95 ${
              isNightMode ? "text-slate-400 hover:text-white" : "text-[#786C60] hover:text-[#2D231B]"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicación Comunitaria */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-1">
          <p className="font-display font-bold flex items-center gap-1.5 text-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {locale === "en"
                ? "Adaptive Storyteller & Shared Online"
                : "Cuentacuentos Adaptativo y Compartido Online"}
            </span>
          </p>
          <p className="font-body text-[11px] leading-relaxed opacity-90">
            {locale === "en"
              ? "Creates long, immersive 4-chapter bedtime stories tailored to your child. Once created, it is shared online so all families can enjoy it!"
              : "Genera cuentos largos e inmersivos de 4 capítulos adaptados a tu peque. ¡Al crearse, se publica online para que todas las familias lo disfruten!"}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleGenerate} className="space-y-3.5 text-xs font-body font-semibold">
          <div>
            <label className="block font-display font-bold text-xs mb-1">
              {t.create.topicLabel}
            </label>
            <input
              type="text"
              required
              disabled={isGenerating}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={
                locale === "en"
                  ? "Ex: A friendly dragon learning to swim under the stars..."
                  : "Ej: Un osito valiente que aprende a cruzar el río dormilón..."
              }
              className={`w-full p-3 rounded-2xl border-2 font-display font-bold text-sm outline-none transition-colors ${
                isNightMode
                  ? "bg-[#141726] border-[#2D3352] text-white focus:border-storybook-coral"
                  : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] focus:border-storybook-coral"
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-display font-bold text-xs mb-1">
                {t.create.valueLabel}
              </label>
              <select
                disabled={isGenerating}
                value={valueCategory}
                onChange={(e) => setValueCategory(e.target.value as ValueCategory)}
                className={`w-full p-2.5 rounded-2xl border-2 font-display font-bold text-xs outline-none ${
                  isNightMode
                    ? "bg-[#141726] border-[#2D3352] text-white focus:border-storybook-coral"
                    : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] focus:border-storybook-coral"
                }`}
              >
                <option value="Valentía">{locale === "en" ? "🦁 Courage" : "🦁 Valentía"}</option>
                <option value="Amistad">{locale === "en" ? "🤝 Friendship" : "🤝 Amistad"}</option>
                <option value="Perseverancia">{locale === "en" ? "🚀 Perseverance" : "🚀 Perseverancia"}</option>
                <option value="Naturaleza">{locale === "en" ? "🌿 Nature" : "🌿 Naturaleza"}</option>
                <option value="Generosidad">{locale === "en" ? "🎁 Generosity" : "🎁 Generosidad"}</option>
                <option value="Curiosidad">{locale === "en" ? "🔍 Curiosity" : "🔍 Curiosidad"}</option>
              </select>
            </div>

            <div>
              <label className="block font-display font-bold text-xs mb-1">
                {t.create.emojiLabel}
              </label>
              <div className="flex gap-1.5">
                {["🐻", "🐬", "🦁", "🦉", "🦄"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => setEmoji(item)}
                    className={`w-8.5 h-8.5 rounded-2xl text-lg flex items-center justify-center border-2 transition-all active:scale-95 ${
                      emoji === item
                        ? "border-storybook-coral bg-storybook-coralLight font-bold scale-110 shadow-xs"
                        : "border-[#EFE6DA] dark:border-[#2D3352]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botón de creación con spinner y estado de progreso */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 rounded-3xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-80"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{generationStep || t.create.writing}</span>
              </div>
            ) : (
              <>
                <BookPlus className="w-4 h-4" />
                <span>
                  {locale === "en"
                    ? "Create & Publish Online ✨"
                    : "Crear y Publicar Online ✨"}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
