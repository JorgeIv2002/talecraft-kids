"use client";

import React, { useState, useEffect } from "react";
import AndroidShell from "@/components/AndroidShell";
import HeaderProfile from "@/components/HeaderProfile";
import StoryCard from "@/components/StoryCard";
import StoryReader from "@/components/StoryReader";
import PersonalizeModal from "@/components/PersonalizeModal";
import ProMembershipModal from "@/components/ProMembershipModal";
import StoryCreatorModal from "@/components/StoryCreatorModal";
import StarShopModal from "@/components/StarShopModal";
import { INITIAL_STORIES } from "@/lib/storiesData";
import { Story, ChildProfile, RewardItem } from "@/lib/types";
import { ArrowRight, Wand2, Crown, Sparkles, ShoppingBag } from "lucide-react";

export default function Home() {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "create" | "pro" | "shop">("library");
  const [filterCategory, setFilterCategory] = useState<string>("Todos");

  // Estado del Pase Pro Familiar
  const [isPro, setIsPro] = useState(false);

  // Lista de perfiles familiares con inventario de recompensas
  const [profilesList, setProfilesList] = useState<ChildProfile[]>([
    {
      id: "child-1",
      name: "Leo",
      age: 7,
      petName: "Chispas el perrito",
      starsCount: 18,
      favoriteValue: "Amistad",
      avatarEmoji: "🦊",
      unlockedRewards: ["pet-dog"],
    },
    {
      id: "child-2",
      name: "Sofía",
      age: 5,
      petName: "Mishi el gatito",
      starsCount: 24,
      favoriteValue: "Generosidad",
      avatarEmoji: "🦁",
      unlockedRewards: ["pet-dog", "acc-crown"],
      equippedAccessory: "acc-crown",
    },
  ]);

  const [activeChildId, setActiveChildId] = useState<string>("child-1");

  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Perfil activo actual
  const currentProfile =
    profilesList.find((p) => p.id === activeChildId) || profilesList[0];

  // Cargar estado guardado al iniciar
  useEffect(() => {
    try {
      const savedPro = localStorage.getItem("talecraft_is_pro");
      if (savedPro) {
        setIsPro(JSON.parse(savedPro));
      }
      const savedProfiles = localStorage.getItem("talecraft_profiles_list");
      if (savedProfiles) {
        setProfilesList(JSON.parse(savedProfiles));
      }
      const savedActiveChild = localStorage.getItem("talecraft_active_child");
      if (savedActiveChild) {
        setActiveChildId(savedActiveChild);
      }
      const savedNight = localStorage.getItem("talecraft_night");
      if (savedNight) {
        setIsNightMode(JSON.parse(savedNight));
      }
      const savedCustomStories = localStorage.getItem("talecraft_custom_stories");
      if (savedCustomStories) {
        const customs = JSON.parse(savedCustomStories);
        setStories([...INITIAL_STORIES, ...customs]);
      }
    } catch {
      // Ignorar errores en SSR
    }
  }, []);

  const handleToggleNightMode = () => {
    setIsNightMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("talecraft_night", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleTogglePro = (active: boolean) => {
    setIsPro(active);
    try {
      localStorage.setItem("talecraft_is_pro", JSON.stringify(active));
    } catch {}
  };

  const handleSaveProfile = (updated: ChildProfile) => {
    setProfilesList((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      try {
        localStorage.setItem("talecraft_profiles_list", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleAddChild = (newChild: ChildProfile) => {
    setProfilesList((prev) => {
      const next = [...prev, newChild];
      try {
        localStorage.setItem("talecraft_profiles_list", JSON.stringify(next));
      } catch {}
      return next;
    });
    setActiveChildId(newChild.id);
  };

  const handleSelectChild = (id: string) => {
    setActiveChildId(id);
    try {
      localStorage.setItem("talecraft_active_child", id);
    } catch {}
  };

  const handleAwardStars = (count: number) => {
    setProfilesList((prev) => {
      const next = prev.map((p) =>
        p.id === currentProfile.id
          ? { ...p, starsCount: p.starsCount + count }
          : p
      );
      try {
        localStorage.setItem("talecraft_profiles_list", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Canjear ítem en el Bazar de Estrellas
  const handleUnlockReward = (item: RewardItem) => {
    if (currentProfile.starsCount < item.costStars) return;

    setProfilesList((prev) => {
      const next = prev.map((p) => {
        if (p.id !== currentProfile.id) return p;

        const updatedUnlocked = [...(p.unlockedRewards || []), item.id];
        let updatedProfile = {
          ...p,
          starsCount: p.starsCount - item.costStars,
          unlockedRewards: updatedUnlocked,
        };

        // Equipar automáticamente al comprar
        if (item.type === "pet") {
          updatedProfile.petName = item.name;
        } else if (item.type === "accessory") {
          updatedProfile.equippedAccessory = item.id;
        } else if (item.type === "sound") {
          updatedProfile.equippedSound = item.id;
        }

        return updatedProfile;
      });

      try {
        localStorage.setItem("talecraft_profiles_list", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Equipar un ítem ya desbloqueado
  const handleEquipReward = (item: RewardItem) => {
    setProfilesList((prev) => {
      const next = prev.map((p) => {
        if (p.id !== currentProfile.id) return p;
        const copy = { ...p };
        if (item.type === "pet") {
          copy.petName = item.name;
        } else if (item.type === "accessory") {
          copy.equippedAccessory = item.id;
        } else if (item.type === "sound") {
          copy.equippedSound = item.id;
        }
        return copy;
      });

      try {
        localStorage.setItem("talecraft_profiles_list", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleStoryCreated = (newStory: Story) => {
    setStories((prev) => {
      const next = [newStory, ...prev];
      try {
        const customOnly = next.filter((s) => s.id.startsWith("custom-"));
        localStorage.setItem("talecraft_custom_stories", JSON.stringify(customOnly));
      } catch {}
      return next;
    });
    setSelectedStory(newStory);
  };

  const handleTabChange = (tab: "library" | "create" | "pro" | "shop") => {
    if (tab === "create") {
      setIsCreatorOpen(true);
    } else if (tab === "shop") {
      setIsShopOpen(true);
    } else if (tab === "pro") {
      setIsProOpen(true);
    } else {
      setSelectedStory(null);
      setActiveTab("library");
    }
  };

  // Filtrado de cuentos
  const filteredStories =
    filterCategory === "Todos"
      ? stories
      : stories.filter((s) => s.valueCategory === filterCategory);

  const featuredStory = stories[0];

  return (
    <AndroidShell
      profile={currentProfile}
      isNightMode={isNightMode}
      onToggleNightMode={handleToggleNightMode}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {/* VISTA A: LECTOR ACTIVO DE CUENTO */}
      {selectedStory ? (
        <StoryReader
          story={selectedStory}
          profile={currentProfile}
          isNightMode={isNightMode}
          onExit={() => setSelectedStory(null)}
          onAwardStars={handleAwardStars}
        />
      ) : (
        /* VISTA B: BIBLIOTECA Y EXPLORADOR DE CUENTOS */
        <div className="space-y-4">
          {/* Header con Perfil del Niño, Avatar, Accesorio y Acceso al Bazar */}
          <HeaderProfile
            profile={currentProfile}
            profilesList={profilesList}
            onSelectChild={handleSelectChild}
            isNightMode={isNightMode}
            isPro={isPro}
            onOpenPersonalize={() => setIsPersonalizeOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
          />

          {/* Banner de Estado Pro o Promoción del Bazar */}
          {isPro ? (
            <div className="rounded-2xl p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-500 text-white shadow-xs">
                  <Crown className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <span className="font-display font-bold text-amber-900 dark:text-amber-200 block">
                    Pase Familiar Pro Activo
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-300">
                    Biblioteca completa y creador ilimitado desbloqueados
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCreatorOpen(true)}
                className="px-2.5 py-1 rounded-xl bg-storybook-coral text-white font-bold text-[11px] touch-press shadow-xs flex items-center gap-1"
              >
                <Wand2 className="w-3 h-3" />
                <span>Crear Cuento</span>
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsShopOpen(true)}
              className="rounded-2xl p-2.5 bg-[#FEF9EE] dark:bg-[#1C180E] border border-[#FDE8B3] dark:border-[#78541D] flex items-center justify-between text-xs cursor-pointer touch-press"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div>
                  <span className="font-display font-bold text-[#B45309] dark:text-[#FBBF24] block text-xs">
                    ¡Tienes {currentProfile.starsCount} Estrellas Mágicas!
                  </span>
                  <span className="text-[10px] text-[#92400E] dark:text-[#D97706]">
                    Canjéalas por coronas, capas y nuevas mascotas
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-[#D97706] text-white font-display font-bold text-[10px]">
                Abrir Bazar →
              </span>
            </div>
          )}

          {/* Banner Cuento Recomendado de la Noche */}
          <section
            className={`rounded-3xl p-4 border shadow-xs relative overflow-hidden transition-all ${
              isNightMode
                ? "bg-[#1A2333] border-[#2D3748] text-white"
                : "bg-white border-[#EFE9DF] text-ink-primary"
            }`}
          >
            <div className="flex items-center justify-between pb-1.5">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isNightMode
                    ? "bg-[#1E293B] text-[#34D399]"
                    : "bg-storybook-mintLight text-storybook-mint"
                }`}
              >
                🌿 Cuento de 4 Capítulos
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isNightMode ? "text-slate-400" : "text-ink-secondary"
                }`}
              >
                ⏱ {featuredStory.estimatedMinutes} min • Noche
              </span>
            </div>

            <div className="space-y-1 mt-2">
              <h2 className="font-display font-extrabold text-base leading-tight">
                {featuredStory.title}
              </h2>
              <p
                className={`text-xs leading-relaxed ${
                  isNightMode ? "text-slate-300" : "text-ink-secondary"
                }`}
              >
                {featuredStory.synopsis}
              </p>
            </div>

            <button
              onClick={() => setSelectedStory(featuredStory)}
              className="w-full mt-3.5 py-2.5 rounded-2xl bg-storybook-coral hover:bg-storybook-coralHover text-white font-display font-bold text-xs shadow-sm touch-press flex items-center justify-center gap-2"
            >
              <span>Comenzar Aventura con {currentProfile.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </section>

          {/* Filtros por Categoría de Valor */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <h3
                className={`font-display font-bold text-xs tracking-tight ${
                  isNightMode ? "text-slate-300" : "text-ink-primary"
                }`}
              >
                Elegir por valor o emoción
              </h3>
              <span
                className={`text-[10px] ${
                  isNightMode ? "text-slate-400" : "text-ink-secondary"
                }`}
              >
                {filteredStories.length} cuentos
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {["Todos", "Amistad", "Perseverancia", "Naturaleza", "Generosidad"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-press border ${
                    filterCategory === cat
                      ? "bg-storybook-coral text-white border-storybook-coral shadow-xs"
                      : isNightMode
                      ? "bg-[#1A2333] border-[#2D3748] text-slate-300 hover:text-white"
                      : "bg-white border-[#EFE9DF] text-ink-primary hover:border-storybook-coral"
                  }`}
                >
                  {cat === "Todos" && "🌟 Todos"}
                  {cat === "Amistad" && "🤝 Amistad"}
                  {cat === "Perseverancia" && "🦁 Perseverancia"}
                  {cat === "Naturaleza" && "🌿 Naturaleza"}
                  {cat === "Generosidad" && "🎁 Generosidad"}
                </button>
              ))}
            </div>
          </div>

          {/* Listado de Cuentos */}
          <div className="space-y-3 pt-1">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                isNightMode={isNightMode}
                isPro={isPro}
                onSelect={(s) => setSelectedStory(s)}
                onRequestPro={() => setIsProOpen(true)}
              />
            ))}
          </div>

          {/* Banner Club Pro Familiar si no es Pro */}
          {!isPro ? (
            <div
              onClick={() => setIsProOpen(true)}
              className="rounded-3xl p-4 bg-[#1F2421] text-white border border-[#2F3732] shadow-md cursor-pointer touch-press flex items-center justify-between mt-2"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-storybook-coral flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-current" />
                  Club de Cuentos Mágicos
                </span>
                <h4 className="font-display font-bold text-xs">
                  Desbloquea todos los cuentos y perfiles
                </h4>
                <p className="text-[10px] text-slate-300">
                  Prueba 7 días gratis. Alterna cuando quieras.
                </p>
              </div>
              <span className="px-2.5 py-1.5 rounded-xl bg-storybook-coral text-white font-display font-bold text-[11px] shrink-0">
                Ver Pro →
              </span>
            </div>
          ) : null}
        </div>
      )}

      {/* Modales */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        profile={currentProfile}
        profilesList={profilesList}
        onSave={handleSaveProfile}
        onAddChild={handleAddChild}
        onSelectChild={handleSelectChild}
        isNightMode={isNightMode}
        isPro={isPro}
        onRequestPro={() => {
          setIsPersonalizeOpen(false);
          setIsProOpen(true);
        }}
      />

      <ProMembershipModal
        isOpen={isProOpen}
        onClose={() => setIsProOpen(false)}
        isNightMode={isNightMode}
        isPro={isPro}
        onTogglePro={handleTogglePro}
      />

      <StoryCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        isNightMode={isNightMode}
        isPro={isPro}
        onRequestPro={() => {
          setIsCreatorOpen(false);
          setIsProOpen(true);
        }}
        onStoryCreated={handleStoryCreated}
      />

      <StarShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        profile={currentProfile}
        isNightMode={isNightMode}
        onUnlockItem={handleUnlockReward}
        onEquipItem={handleEquipReward}
      />
    </AndroidShell>
  );
}
