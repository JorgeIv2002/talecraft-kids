"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, X, Crown, BookPlus, CheckCircle2 } from "lucide-react";
import { Story, ValueCategory } from "@/lib/types";

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
  const [topic, setTopic] = useState("");
  const [valueCategory, setValueCategory] = useState<ValueCategory>("Valentía");
  const [emoji, setEmoji] = useState("🤖");
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
      const title = `La Gran Aventura: ${topic.trim()}`;

      const generatedStory: Story = {
        id: storyId,
        title,
        synopsis: `Un cuento interactivo especial creado para la familia sobre ${topic.trim()}, reforzando el valor de la ${valueCategory}.`,
        valueCategory,
        estimatedMinutes: 5,
        coverEmoji: emoji,
        accentColor: "#D9532F",
        decisionsCount: 2,
        startNodeId: "c-node-1",
        isPremium: true,
        nodes: {
          "c-node-1": {
            id: "c-node-1",
            chapterNumber: 1,
            totalChapters: 2,
            sceneEmoji: emoji,
            text: `Érase una vez una historia única sobre ${topic.trim()}. Al comenzar la mañana, surgió un dilema inesperado en el camino que requería poner a prueba la ${valueCategory}.`,
            choices: [
              {
                id: "c-opt-1",
                label: "Enfrentar el desafío con paciencia y una sonrisa",
                hint: "Un corazón valiente siempre encuentra una salida.",
                nextNodeId: "c-node-end-1",
              },
              {
                id: "c-opt-2",
                label: "Pedir consejo a los sabios del valle",
                hint: "Escuchar a los demás enriquece nuestras decisiones.",
                nextNodeId: "c-node-end-2",
              },
            ],
          },
          "c-node-end-1": {
            id: "c-node-end-1",
            chapterNumber: 2,
            totalChapters: 2,
            sceneEmoji: "✨",
            text: `¡Fue un éxito rotundo! Al mantener la calma y actuar con ${valueCategory.toLowerCase()}, todo el bosque aplaudió su gran corazón.`,
            isEnding: true,
            moralLesson: {
              title: `Lección de ${valueCategory}`,
              description: `Cuando practicamos la ${valueCategory.toLowerCase()}, inspiramos a todos los que nos rodean a ser mejores.`,
              starsAwarded: 3,
            },
          },
          "c-node-end-2": {
            id: "c-node-end-2",
            chapterNumber: 2,
            totalChapters: 2,
            sceneEmoji: "🌟",
            text: `Los sabios quedaron maravillados con la humildad para escuchar. Juntos celebraron una fiesta iluminada por luciérnagas.`,
            isEnding: true,
            moralLesson: {
              title: `Sabiduría y ${valueCategory}`,
              description: `Aprender de los demás y actuar con ${valueCategory.toLowerCase()} nos hace verdaderos héroes.`,
              starsAwarded: 3,
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 ${
          isNightMode
            ? "bg-[#1A2333] border-[#2D3748] text-white"
            : "bg-white border-[#EFE9DF] text-ink-primary"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-storybook-coral/10 text-storybook-coral">
              <Wand2 className="w-4 h-4" />
            </span>
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-bold text-base">Crear Cuento Mágico</h2>
              <span className="px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[9px] font-bold flex items-center gap-0.5">
                <Crown className="w-2.5 h-2.5 fill-current text-[#D97706]" />
                PRO
              </span>
            </div>
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

        {/* Explicación / Estado Pro */}
        {!isPro ? (
          <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs space-y-2">
            <p className="font-bold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 fill-current text-[#D97706]" />
              Función Exclusiva del Pase Familiar Pro
            </p>
            <p className="leading-snug">
              Crea cuentos interactivos infinitos sobre cualquier personaje que tu hijo imagine.
            </p>
            <button
              type="button"
              onClick={onRequestPro}
              className="w-full py-2 rounded-xl bg-storybook-coral text-white font-bold text-xs"
            >
              Desbloquear con Prueba Gratuita →
            </button>
          </div>
        ) : (
          <p className="text-xs text-storybook-mint font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Generador ilimitado activo con tu Pase Familiar Pro.</span>
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold mb-1">
              ¿De qué tratará el cuento de hoy?
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej: Un robot que hace amigos en la playa..."
              className={`w-full p-2.5 rounded-xl border font-medium text-sm outline-none transition-colors ${
                isNightMode
                  ? "bg-[#121824] border-[#2D3748] text-white focus:border-storybook-coral"
                  : "bg-[#FDFBF7] border-[#EFE9DF] text-ink-primary focus:border-storybook-coral"
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Valor principal:</label>
              <select
                value={valueCategory}
                onChange={(e) => setValueCategory(e.target.value as ValueCategory)}
                className={`w-full p-2.5 rounded-xl border font-medium text-xs outline-none ${
                  isNightMode
                    ? "bg-[#121824] border-[#2D3748] text-white focus:border-storybook-coral"
                    : "bg-[#FDFBF7] border-[#EFE9DF] text-ink-primary focus:border-storybook-coral"
                }`}
              >
                <option value="Valentía">🦁 Valentía</option>
                <option value="Amistad">🤝 Amistad</option>
                <option value="Perseverancia">🚀 Perseverancia</option>
                <option value="Naturaleza">🌿 Naturaleza</option>
                <option value="Generosidad">🎁 Generosidad</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Emoji de portada:</label>
              <div className="flex gap-1.5">
                {["🤖", "🐬", "🦖", "🛸", "🧙‍♂️"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setEmoji(item)}
                    className={`w-8 h-8 rounded-xl text-base flex items-center justify-center border transition-all ${
                      emoji === item
                        ? "border-storybook-coral bg-storybook-coral/10 font-bold"
                        : "border-slate-200 dark:border-slate-700"
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
            className="w-full py-3.5 rounded-2xl bg-storybook-coral hover:bg-storybook-coralHover text-white font-display font-bold text-xs shadow-md touch-press transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span>Generando Aventura Mágica... 🪄</span>
            ) : (
              <>
                <BookPlus className="w-4 h-4" />
                <span>Crear Cuento y Añadir a la Biblioteca</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
