"use client";

import React, { useState } from "react";
import { Star, X, Check, Sparkles, ShoppingBag, Music, Shield, Heart } from "lucide-react";
import { ChildProfile, RewardItem } from "@/lib/types";
import { REWARD_ITEMS } from "@/lib/rewardsData";

interface StarShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ChildProfile;
  isNightMode: boolean;
  onUnlockItem: (item: RewardItem) => void;
  onEquipItem: (item: RewardItem) => void;
}

export default function StarShopModal({
  isOpen,
  onClose,
  profile,
  isNightMode,
  onUnlockItem,
  onEquipItem,
}: StarShopModalProps) {
  const [activeTab, setActiveTab] = useState<"pet" | "accessory" | "sound">("pet");

  if (!isOpen) return null;

  const filteredItems = REWARD_ITEMS.filter((item) => item.type === activeTab);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[88vh] ${
          isNightMode
            ? "bg-[#1A2333] border-[#2D3748] text-white"
            : "bg-white border-[#EFE9DF] text-ink-primary"
        }`}
      >
        {/* Cabecera del Bazar */}
        <div className="flex items-center justify-between pb-2 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#FEF9EE] border border-[#FDE8B3] text-[#D97706]">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display font-extrabold text-base leading-tight">
                Bazar de las Estrellas Mágicas
              </h2>
              <p className="text-[11px] text-storybook-coral font-bold">
                Para el héroe {profile.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Saldo de estrellas del niño */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF9EE] border border-[#FDE8B3] text-xs font-bold text-[#B45309]">
              <Star className="w-4 h-4 fill-current text-[#E5A93C] animate-pulse" />
              <span>{profile.starsCount} ⭐</span>
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
        </div>

        {/* Pestañas de Categoría */}
        <div className="flex items-center gap-1 bg-[#F4F1EA] dark:bg-[#121824] p-1 rounded-2xl border border-[#EFE9DF] dark:border-[#2D3748]">
          <button
            onClick={() => setActiveTab("pet")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === "pet"
                ? "bg-white dark:bg-[#1A2333] shadow-xs text-storybook-coral"
                : "text-ink-secondary dark:text-slate-400"
            }`}
          >
            <span>🐶</span>
            <span>Mascotas</span>
          </button>

          <button
            onClick={() => setActiveTab("accessory")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === "accessory"
                ? "bg-white dark:bg-[#1A2333] shadow-xs text-storybook-coral"
                : "text-ink-secondary dark:text-slate-400"
            }`}
          >
            <span>👑</span>
            <span>Accesorios</span>
          </button>

          <button
            onClick={() => setActiveTab("sound")}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === "sound"
                ? "bg-white dark:bg-[#1A2333] shadow-xs text-storybook-coral"
                : "text-ink-secondary dark:text-slate-400"
            }`}
          >
            <span>🌧️</span>
            <span>Sonidos</span>
          </button>
        </div>

        {/* Lista de Artículos Disponibles */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
          {filteredItems.map((item) => {
            const isUnlocked =
              item.costStars === 0 || profile.unlockedRewards?.includes(item.id);
            const isEquipped =
              (item.type === "pet" && profile.petName.includes(item.name.split(" ")[0])) ||
              (item.type === "accessory" && profile.equippedAccessory === item.id) ||
              (item.type === "sound" && profile.equippedSound === item.id);
            const canAfford = profile.starsCount >= item.costStars;

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isEquipped
                    ? "bg-[#EBF5F1] border-[#3A7D6B] dark:bg-[#12231E] dark:border-[#3A7D6B]"
                    : isNightMode
                    ? "bg-[#121824] border-[#2D3748]"
                    : "bg-[#FDFBF7] border-[#EFE9DF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1A2333] border border-[#EFE9DF] dark:border-[#2D3748] flex items-center justify-center text-2xl shadow-xs shrink-0">
                    {item.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-xs">{item.name}</h4>
                      {isEquipped && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#3A7D6B] text-white">
                          En uso ✨
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-ink-secondary dark:text-slate-400 line-clamp-2 leading-tight mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Acciones del Ítem */}
                <div className="shrink-0">
                  {isUnlocked ? (
                    <button
                      onClick={() => onEquipItem(item)}
                      disabled={isEquipped}
                      className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all touch-press ${
                        isEquipped
                          ? "bg-[#3A7D6B] text-white cursor-default"
                          : "bg-storybook-coral hover:bg-storybook-coralHover text-white shadow-xs"
                      }`}
                    >
                      {isEquipped ? "Equipado ✓" : "Llevar"}
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnlockItem(item)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs flex items-center gap-1 transition-all touch-press ${
                        canAfford
                          ? "bg-[#D97706] hover:bg-[#B45309] text-white shadow-xs animate-pulse"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                      }`}
                      title={!canAfford ? `Te faltan ${item.costStars - profile.starsCount} estrellas` : ""}
                    >
                      <span>Canjear</span>
                      <span>⭐ {item.costStars}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Informativo */}
        <div className="pt-2 border-t border-inherit flex items-center justify-between text-[11px] text-ink-secondary dark:text-slate-400">
          <span>📖 Lee más cuentos para ganar más estrellas.</span>
          <span className="font-bold text-storybook-coral">¡Cada decisión cuenta!</span>
        </div>
      </div>
    </div>
  );
}
