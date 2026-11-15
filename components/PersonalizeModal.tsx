"use client";

import React, { useState } from "react";
import { X, Sparkles, Heart, Shield, Compass } from "lucide-react";
import { ChildProfile, ValueCategory } from "@/lib/types";

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ChildProfile;
  onSave: (updated: ChildProfile) => void;
  isNightMode: boolean;
}

export default function PersonalizeModal({
  isOpen,
  onClose,
  profile,
  onSave,
  isNightMode,
}: PersonalizeModalProps) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [petName, setPetName] = useState(profile.petName);
  const [favoriteValue, setFavoriteValue] = useState<ValueCategory>(profile.favoriteValue);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      ...profile,
      name: name.trim(),
      age: Number(age) || 7,
      petName: petName.trim() || "Chispas",
      favoriteValue,
    });
    onClose();
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
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-1 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-storybook-coral/10 text-storybook-coral">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="font-display font-bold text-base">Crear Pequeño Héroe</h2>
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

        {/* Formulario de Personalización */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold mb-1">Nombre del pequeño héroe:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2.5 rounded-xl border font-medium text-sm outline-none transition-colors ${
                isNightMode
                  ? "bg-[#121824] border-[#2D3748] text-white focus:border-storybook-coral"
                  : "bg-[#FDFBF7] border-[#EFE9DF] text-ink-primary focus:border-storybook-coral"
              }`}
              placeholder="Ej: Sofía, Leo, Lucas..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Edad del niño:</label>
              <select
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border font-medium text-xs outline-none ${
                  isNightMode
                    ? "bg-[#121824] border-[#2D3748] text-white focus:border-storybook-coral"
                    : "bg-[#FDFBF7] border-[#EFE9DF] text-ink-primary focus:border-storybook-coral"
                }`}
              >
                {[4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} años
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Mascota o amigo:</label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className={`w-full p-2.5 rounded-xl border font-medium text-xs outline-none ${
                  isNightMode
                    ? "bg-[#121824] border-[#2D3748] text-white focus:border-storybook-coral"
                    : "bg-[#FDFBF7] border-[#EFE9DF] text-ink-primary focus:border-storybook-coral"
                }`}
                placeholder="Ej: Chispas, Toby..."
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Valor principal a reforzar:</label>
            <select
              value={favoriteValue}
              onChange={(e) => setFavoriteValue(e.target.value as ValueCategory)}
              className={`w-full p-2.5 rounded-xl border font-medium text-xs outline-none ${
                isNightMode
                  ? "bg-[#121824] border-[#2D3748] text-white focus:border-storybook-coral"
                  : "bg-[#FDFBF7] border-[#EFE9DF] text-ink-primary focus:border-storybook-coral"
              }`}
            >
              <option value="Amistad">🤝 Amistad y Compañerismo</option>
              <option value="Perseverancia">🦁 Perseverancia y Paciencia</option>
              <option value="Naturaleza">🌿 Respeto a la Naturaleza</option>
              <option value="Generosidad">🎁 Generosidad y Empatía</option>
              <option value="Curiosidad">🚀 Curiosidad y Creatividad</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-2xl bg-storybook-coral hover:bg-storybook-coralHover text-white font-display font-bold text-xs shadow-md touch-press transition-colors"
          >
            Adaptar Todos los Cuentos para {name || "el Héroe"} ✨
          </button>
        </form>
      </div>
    </div>
  );
}
