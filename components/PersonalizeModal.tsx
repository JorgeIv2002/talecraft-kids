"use client";

import React, { useState } from "react";
import { X, Sparkles, Plus, Crown, UserCheck } from "lucide-react";
import { ChildProfile, ValueCategory } from "@/lib/types";

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ChildProfile;
  profilesList: ChildProfile[];
  onSave: (updated: ChildProfile) => void;
  onAddChild: (newChild: ChildProfile) => void;
  onSelectChild: (id: string) => void;
  isNightMode: boolean;
  isPro: boolean;
  onRequestPro: () => void;
}

export default function PersonalizeModal({
  isOpen,
  onClose,
  profile,
  profilesList,
  onSave,
  onAddChild,
  onSelectChild,
  isNightMode,
  isPro,
  onRequestPro,
}: PersonalizeModalProps) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [petName, setPetName] = useState(profile.petName);
  const [favoriteValue, setFavoriteValue] = useState<ValueCategory>(profile.favoriteValue);
  const [avatarEmoji, setAvatarEmoji] = useState(profile.avatarEmoji || "🦊");

  const [isAddingNew, setIsAddingNew] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isAddingNew) {
      const newChild: ChildProfile = {
        id: `child-${Date.now()}`,
        name: name.trim(),
        age: Number(age) || 5,
        petName: petName.trim() || "Mishi",
        starsCount: 5,
        favoriteValue,
        avatarEmoji,
        unlockedRewards: ["pet-dog"],
      };
      onAddChild(newChild);
      setIsAddingNew(false);
    } else {
      onSave({
        ...profile,
        name: name.trim(),
        age: Number(age) || 7,
        petName: petName.trim() || "Chispas",
        favoriteValue,
        avatarEmoji,
      });
    }
    onClose();
  };

  const handleStartAddSibling = () => {
    if (!isPro) {
      onRequestPro();
      return;
    }
    if (profilesList.length >= 3) {
      alert("Has alcanzado el límite de 3 perfiles infantiles familiares.");
      return;
    }
    setName("");
    setAge(5);
    setPetName("Mishi");
    setAvatarEmoji("🦁");
    setIsAddingNew(true);
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
        <div className="flex items-center justify-between pb-1.5 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#FFEAE3] text-storybook-coral text-base">
              ✨
            </span>
            <h2 className="font-display font-bold text-base">
              {isAddingNew ? "Añadir Pequeño Héroe" : `Perfil de ${profile.name}`}
            </h2>
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

        {/* Selector Multi-Hijo */}
        {!isAddingNew && (
          <div className="space-y-1.5 pb-1">
            <div className="flex items-center justify-between text-xs font-display font-bold">
              <span className={isNightMode ? "text-slate-300" : "text-[#786C60]"}>
                Perfiles de la familia:
              </span>
              <button
                type="button"
                onClick={handleStartAddSibling}
                className="text-storybook-coral font-bold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir hermanito/a</span>
                {!isPro && <Crown className="w-3 h-3 fill-current text-amber-500" />}
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {profilesList.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onSelectChild(p.id);
                    setName(p.name);
                    setAge(p.age);
                    setPetName(p.petName);
                    setFavoriteValue(p.favoriteValue);
                    setAvatarEmoji(p.avatarEmoji || "🦊");
                  }}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-display font-bold flex items-center gap-1.5 border-2 transition-all ${
                    p.id === profile.id
                      ? "bg-storybook-coral text-white border-[#D94524] shadow-xs scale-105"
                      : isNightMode
                      ? "bg-[#141726] border-[#2D3352] text-slate-300"
                      : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B]"
                  }`}
                >
                  <span className="text-sm">{p.avatarEmoji || "🦊"}</span>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-body font-semibold">
          {/* Avatar Selector */}
          <div>
            <label className="block font-display font-bold text-xs mb-1.5">Avatar del héroe:</label>
            <div className="flex gap-2">
              {["🦊", "🦁", "🐼", "🦄", "🚀", "🐲"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatarEmoji(emoji)}
                  className={`w-10 h-10 rounded-2xl text-xl flex items-center justify-center border-2 transition-all active:scale-95 ${
                    avatarEmoji === emoji
                      ? "border-storybook-coral bg-storybook-coralLight scale-110 shadow-sm"
                      : isNightMode
                      ? "border-[#2D3352] bg-[#141726]"
                      : "border-[#EFE6DA] bg-[#FAF7F2]"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-display font-bold text-xs mb-1">Nombre del pequeño héroe:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-2xl border-2 font-display font-bold text-sm outline-none transition-colors ${
                isNightMode
                  ? "bg-[#141726] border-[#2D3352] text-white focus:border-storybook-coral"
                  : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] focus:border-storybook-coral"
              }`}
              placeholder="Ej: Sofía, Leo, Lucas..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-display font-bold text-xs mb-1">Edad del niño:</label>
              <select
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={`w-full p-2.5 rounded-2xl border-2 font-display font-bold text-xs outline-none ${
                  isNightMode
                    ? "bg-[#141726] border-[#2D3352] text-white focus:border-storybook-coral"
                    : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] focus:border-storybook-coral"
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
              <label className="block font-display font-bold text-xs mb-1">Mascota o amigo:</label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className={`w-full p-2.5 rounded-2xl border-2 font-display font-bold text-xs outline-none ${
                  isNightMode
                    ? "bg-[#141726] border-[#2D3352] text-white focus:border-storybook-coral"
                    : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] focus:border-storybook-coral"
                }`}
                placeholder="Ej: Chispas, Toby..."
              />
            </div>
          </div>

          <div>
            <label className="block font-display font-bold text-xs mb-1">Valor favorito a reforzar:</label>
            <select
              value={favoriteValue}
              onChange={(e) => setFavoriteValue(e.target.value as ValueCategory)}
              className={`w-full p-2.5 rounded-2xl border-2 font-display font-bold text-xs outline-none ${
                isNightMode
                  ? "bg-[#141726] border-[#2D3352] text-white focus:border-storybook-coral"
                  : "bg-[#FAF7F2] border-[#EFE6DA] text-[#2D231B] focus:border-storybook-coral"
              }`}
            >
              <option value="Amistad">🤝 Amistad y Compañerismo</option>
              <option value="Perseverancia">🦁 Perseverancia y Paciencia</option>
              <option value="Naturaleza">🌿 Respeto a la Naturaleza</option>
              <option value="Generosidad">🎁 Generosidad y Empatía</option>
              <option value="Curiosidad">🚀 Curiosidad y Creatividad</option>
            </select>
          </div>

          <div className="flex gap-2 pt-1">
            {isAddingNew && (
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="py-3 px-4 rounded-2xl border-2 border-slate-300 text-xs font-display font-bold"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-md transition-all"
            >
              {isAddingNew ? "Guardar Nuevo Perfil ✨" : `Guardar Cambios para ${name || "el Héroe"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
