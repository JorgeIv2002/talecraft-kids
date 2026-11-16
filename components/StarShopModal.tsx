"use client";

import React, { useState } from "react";
import { Star, X, Check, Sparkles, ShoppingBag } from "lucide-react";
import { ChildProfile, RewardItem } from "@/lib/types";
import { REWARD_ITEMS } from "@/lib/rewardsData";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"pet" | "accessory" | "sound">("pet");

  if (!isOpen) return null;

  const filteredItems = REWARD_ITEMS.filter((item) => item.type === activeTab);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-[36px] p-6 border-2 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[88vh] ${
          isNightMode
            ? "bg-[#1C2035] border-[#2D3352] text-white"
            : "bg-white border-[#EFE6DA] text-[#2D231B]"
        }`}
      >
        {/* Cabecera del Bazar */}
        <div className="flex items-center justify-between pb-2 border-b border-inherit">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-amber-100 text-[#D97706] text-xl shadow-xs">
              🎁
            </span>
            <div>
              <h2 className="font-display font-extrabold text-base leading-tight">
                {t.shop.title}
              </h2>
              <p className="text-xs font-display font-bold text-storybook-coral">
                {locale === "en" ? `For little hero ${profile.name}` : `Para el héroe ${profile.name}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] text-xs font-display font-bold text-[#B45309]">
              <Star className="w-4 h-4 fill-current text-[#F59E0B] animate-pulse" />
              <span>{profile.starsCount} ⭐</span>
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
        </div>

        {/* Pestañas de Categoría */}
        <div className="flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-[#141726] p-1.5 rounded-2xl border-2 border-[#EFE6DA] dark:border-[#2D3352]">
          <button
            onClick={() => setActiveTab("pet")}
            className={`flex-1 py-2 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "pet"
                ? "bg-white dark:bg-[#1E2238] shadow-xs text-storybook-coral"
                : "text-[#786C60] dark:text-slate-400"
            }`}
          >
            <span>🐶</span>
            <span>{t.shop.petsTab}</span>
          </button>

          <button
            onClick={() => setActiveTab("accessory")}
            className={`flex-1 py-2 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "accessory"
                ? "bg-white dark:bg-[#1E2238] shadow-xs text-storybook-coral"
                : "text-[#786C60] dark:text-slate-400"
            }`}
          >
            <span>👑</span>
            <span>{t.shop.accTab}</span>
          </button>

          <button
            onClick={() => setActiveTab("sound")}
            className={`flex-1 py-2 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "sound"
                ? "bg-white dark:bg-[#1E2238] shadow-xs text-storybook-coral"
                : "text-[#786C60] dark:text-slate-400"
            }`}
          >
            <span>🌧️</span>
            <span>{t.shop.soundsTab}</span>
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
                className={`p-4 rounded-3xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isEquipped
                    ? "bg-[#ECFDF5] border-[#10B981] dark:bg-[#12231E] dark:border-[#059669]"
                    : isNightMode
                    ? "bg-[#141726] border-[#2D3352]"
                    : "bg-[#FAF7F2] border-[#EFE6DA]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-white dark:bg-[#1E2238] border border-[#EFE6DA] dark:border-[#2D3352] flex items-center justify-center text-3xl shadow-xs shrink-0">
                    {item.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-xs">{item.name}</h4>
                      {isEquipped && (
                        <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full bg-[#10B981] text-white">
                          En uso ✨
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-body font-semibold text-[#786C60] dark:text-slate-400 line-clamp-2 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="shrink-0">
                  {isUnlocked ? (
                    <button
                      onClick={() => onEquipItem(item)}
                      disabled={isEquipped}
                      className={`px-3.5 py-1.5 rounded-xl font-display font-bold text-xs transition-all ${
                        isEquipped
                          ? "bg-[#10B981] text-white cursor-default"
                          : "btn-toy-coral bg-storybook-coral text-white shadow-xs"
                      }`}
                    >
                      {isEquipped ? `${t.shop.equipped} ✓` : t.shop.equip}
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnlockItem(item)}
                      disabled={!canAfford}
                      className={`px-3.5 py-2 rounded-xl font-display font-bold text-xs flex items-center gap-1 transition-all ${
                        canAfford
                          ? "btn-toy-amber bg-[#D97706] text-white shadow-xs"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                      }`}
                      title={!canAfford ? `${t.shop.needStars} ${item.costStars - profile.starsCount} ${t.shop.stars}` : ""}
                    >
                      <span>{t.shop.unlock}</span>
                      <span>⭐ {item.costStars}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-inherit flex items-center justify-between text-xs font-display font-bold text-[#786C60] dark:text-slate-400">
          <span>{locale === "en" ? "📖 Read stories to earn stars" : "📖 Lee cuentos para ganar más estrellas"}</span>
          <span className="text-storybook-coral">
            {locale === "en" ? "Every night an adventure!" : "¡Cada noche una aventura!"}
          </span>
        </div>
      </div>
    </div>
  );
}
