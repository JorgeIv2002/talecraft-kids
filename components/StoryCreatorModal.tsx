"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, X, Crown, BookPlus, CheckCircle2 } from "lucide-react";
import { Story, ValueCategory } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface StoryCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNightMode: boolean;
  isPro: boolean;
  onRequestPro: () => void;
  onStoryCreated: (newStory: Story) => void;
}

export default function StoryCreatorModal({
  isOpen,
  onClose,
  isNightMode,
  isPro,
  onRequestPro,
  onStoryCreated,
}: StoryCreatorModalProps) {
  const { t, locale } = useLanguage();
  const [topic, setTopic] = useState("");
  const [valueCategory, setValueCategory] = useState<ValueCategory>("Valentía");
  const [emoji, setEmoji] = useState("🐻");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro) {
      onRequestPro();
      return;
    }
    if (!topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const storyId = `custom-${Date.now()}`;
      const title =
        locale === "en"
          ? `The Great Adventure: ${topic.trim()}`
          : `La Gran Aventura: ${topic.trim()}`;

      const synopsis =
        locale === "en"
          ? `A special interactive story created for the family about ${topic.trim()}, practicing the value of ${valueCategory}.`
          : `Un cuento interactivo especial creado para la familia sobre ${topic.trim()}, reforzando el valor de la ${valueCategory}.`;

      const generatedStory: Story = {
        id: storyId,
        title,
        synopsis,
        valueCategory,
        estimatedMinutes: 6,
        coverEmoji: emoji,
        accentColor: "#FF6B4A",
        decisionsCount: 3,
        startNodeId: "c-node-1",
        isPremium: true,
        collection: "popular",
        gradientBg: "from-[#FF7A59] via-[#F05735] to-[#D94524]",
        nodes: {
          "c-node-1": {
            id: "c-node-1",
            chapterNumber: 1,
            totalChapters: 3,
            sceneEmoji: emoji,
            text:
              locale === "en"
                ? `Once upon a time in a magical land about ${topic.trim()}. Early in the morning, an unexpected path appeared testing everyone's ${valueCategory}.`
                : `Érase una vez una historia mágica sobre ${topic.trim()}. Al comenzar la mañana, surgió un dilema inesperado en el camino que requería poner a prueba la ${valueCategory}.`,
            choices: [
              {
                id: "c-opt-1",
                label:
                  locale === "en"
                    ? "Face the challenge with patience and a smile"
                    : "Enfrentar el desafío con paciencia y una sonrisa",
                hint:
                  locale === "en"
                    ? "A noble heart always finds a way."
                    : "Un corazón noble siempre encuentra una salida.",
                nextNodeId: "c-node-2a",
              },
              {
                id: "c-opt-2",
                label:
                  locale === "en"
                    ? "Ask the wise elders of the valley for advice"
                    : "Pedir consejo a los sabios del valle",
                hint:
                  locale === "en"
                    ? "Listening to others enriches our choices."
                    : "Escuchar a los demás enriquece nuestras decisiones.",
                nextNodeId: "c-node-2b",
              },
            ],
          },
          "c-node-2a": {
            id: "c-node-2a",
            chapterNumber: 2,
            totalChapters: 3,
            sceneEmoji: "✨",
            text:
              locale === "en"
                ? `By staying calm and kind, the trail lit up with friendly fireflies cheering for bravery and gentleness.`
                : `Al mantener la calma, todo el sendero se llenó de luciérnagas y pequeños animales que aplaudieron su bondad.`,
            choices: [
              {
                id: "c-2a1",
                label:
                  locale === "en"
                    ? "Celebrate together and sing a joyful song"
                    : "Celebrar con un festín de néctar y cantar juntos",
                hint:
                  locale === "en"
                    ? "Joy multiplies when shared with friends."
                    : "La alegría se multiplica al compartirse.",
                nextNodeId: "c-node-end",
              },
            ],
          },
          "c-node-2b": {
            id: "c-node-2b",
            chapterNumber: 2,
            totalChapters: 3,
            sceneEmoji: "🦉",
            text:
              locale === "en"
                ? `The valley elders smiled and shared a secret star map teaching how kindness solves any mystery.`
                : `Los ancianos del valle le entregaron un mapa de estrellas secretas que indicaba cómo resolver cualquier problema con amor.`,
            choices: [
              {
                id: "c-2b1",
                label:
                  locale === "en"
                    ? "Follow the golden constellation to the journey's end"
                    : "Seguir la constelación dorada hasta el final del viaje",
                hint:
                  locale === "en"
                    ? "Wisdom guides the safest steps."
                    : "La sabiduría guía los pasos más seguros.",
                nextNodeId: "c-node-end",
              },
            ],
          },
          "c-node-end": {
            id: "c-node-end",
            chapterNumber: 3,
            totalChapters: 3,
            sceneEmoji: "🏆",
            text:
              locale === "en"
                ? `It was a glorious adventure! Everyone in the realm learned that practicing ${valueCategory.toLowerCase()} brings happiness to all.`
                : `¡Fue un triunfo memorable! Todo el reino aprendió que cuando actuamos con ${valueCategory.toLowerCase()}, el mundo entero se transforma en un lugar más feliz.`,
            isEnding: true,
            moralLesson: {
              title:
                locale === "en"
                  ? `Magical Lesson of ${valueCategory}`
                  : `Lección Mágica de ${valueCategory}`,
              description:
                locale === "en"
                  ? `When we practice ${valueCategory.toLowerCase()}, we inspire everyone around us to shine.`
                  : `Cuando practicamos la ${valueCategory.toLowerCase()}, inspiramos a todos los que nos rodean a ser mejores.`,
              starsAwarded: 5,
            },
          },
        },
      };

      onStoryCreated(generatedStory);
      setIsGenerating(false);
      setTopic("");
      onClose();
    }, 1000);
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
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-storybook-coralLight text-storybook-coral text-base">
              🪄
            </span>
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-bold text-base">{t.create.title}</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10px] font-display font-bold flex items-center gap-0.5">
                <Crown className="w-3 h-3 fill-current text-[#D97706]" />
                {t.create.proBadge}
              </span>
            </div>
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

        {/* Explicación Pro */}
        {!isPro ? (
          <div className="p-4 rounded-3xl bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] border-2 border-[#FDE68A] text-[#92400E] text-xs space-y-2">
            <p className="font-display font-bold flex items-center gap-1.5 text-xs">
              <Crown className="w-4 h-4 fill-current text-[#D97706]" />
              {t.create.exclusiveNotice}
            </p>
            <p className="font-body font-semibold leading-relaxed">
              {t.create.exclusiveDesc}
            </p>
            <button
              type="button"
              onClick={onRequestPro}
              className="w-full py-2.5 rounded-xl btn-toy-coral bg-storybook-coral text-white font-display font-bold text-xs"
            >
              {t.create.unlockTrial}
            </button>
          </div>
        ) : (
          <p className="text-xs font-display font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.create.proActiveNotice}</span>
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleGenerate} className="space-y-3.5 text-xs font-body font-semibold">
          <div>
            <label className="block font-display font-bold text-xs mb-1">
              {t.create.topicLabel}
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.create.topicPlaceholder}
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

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 rounded-3xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span>{t.create.writing}</span>
            ) : (
              <>
                <BookPlus className="w-4 h-4" />
                <span>{t.create.submit}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
