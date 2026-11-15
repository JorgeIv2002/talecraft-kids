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

  // Equipar ítem desbloqueado
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
          {/* Header con Perfil del Niño y Botón del Bazar */}
          <HeaderProfile
            profile={currentProfile}
            profilesList={profilesList}
            onSelectChild={handleSelectChild}
            isNightMode={isNightMode}
            isPro={isPro}
            onOpenPersonalize={() => setIsPersonalizeOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
          />

          {/* Banner de Estado Pro Activo */}
          {isPro ? (
            <div className="rounded-3xl p-3.5 bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] dark:from-[#372614] dark:to-[#451A03] border-2 border-[#FDE68A] dark:border-[#78350F] flex items-center justify-between text-xs shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-2xl bg-[#F59E0B] text-white shadow-xs">
                  <Crown className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <span className="font-display font-bold text-amber-950 dark:text-amber-100 block text-xs">
                    Pase Familiar Pro Activo
                  </span>
                  <span className="text-[11px] font-body text-amber-900/80 dark:text-amber-200">
                    Todos los cuentos y generador ilimitado desbloqueados
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCreatorOpen(true)}
                className="btn-toy-coral px-3 py-1.5 rounded-xl bg-storybook-coral text-white font-display font-bold text-xs shadow-xs flex items-center gap-1"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Crear Cuento</span>
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsShopOpen(true)}
              className="rounded-3xl p-3 bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] dark:from-[#231E12] dark:to-[#382D13] border-2 border-[#FDE68A] dark:border-[#78541D] flex items-center justify-between text-xs cursor-pointer shadow-xs transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl animate-bounce">🎁</span>
                <div>
                  <span className="font-display font-bold text-[#92400E] dark:text-[#FBBF24] block text-xs">
                    ¡Tienes {currentProfile.starsCount} Estrellas Mágicas!
                  </span>
                  <span className="text-[11px] font-body text-[#B45309] dark:text-amber-200">
                    Canjea por coronas, capas y nuevas mascotas
                  </span>
                </div>
              </div>
              <span className="btn-toy-amber px-3 py-1.5 rounded-xl bg-[#D97706] text-white font-display font-bold text-xs">
                Abrir Bazar →
              </span>
            </div>
          )}

          {/* Banner Cuento Destacado Ilustrado */}
          <section
            className={`rounded-[32px] p-5 border-2 shadow-storybook relative overflow-hidden transition-all ${
              isNightMode
                ? "bg-gradient-to-b from-[#1C2035] to-[#15192B] border-[#2D3352] text-white"
                : "bg-gradient-to-b from-[#FFFDF9] to-[#FFF5EB] border-[#FFDFD2] text-[#2D231B]"
            }`}
          >
            <div className="flex items-center justify-between pb-1.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider border ${
                  isNightMode
                    ? "bg-[#252C48] text-[#34D399] border-[#38436B]"
                    : "bg-emerald-100 text-emerald-800 border-emerald-200"
                }`}
              >
                🌿 Cuento de 4 Capítulos
              </span>
              <span
                className={`text-xs font-display font-bold ${
                  isNightMode ? "text-slate-400" : "text-[#786C60]"
                }`}
              >
                ⏱ {featuredStory.estimatedMinutes} min lectura
              </span>
            </div>

            <div className="space-y-1 mt-2.5">
              <h2 className="font-display font-bold text-lg leading-tight">
                {featuredStory.title}
              </h2>
              <p
                className={`text-xs leading-relaxed font-body font-medium ${
                  isNightMode ? "text-slate-300" : "text-[#6E6259]"
                }`}
              >
                {featuredStory.synopsis}
              </p>
            </div>

            <button
              onClick={() => setSelectedStory(featuredStory)}
              className="w-full mt-4 py-3 rounded-2xl btn-toy-coral bg-storybook-coral hover:bg-[#F05735] text-white font-display font-bold text-xs shadow-sm flex items-center justify-center gap-2"
            >
              <span>Comenzar Aventura con {currentProfile.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

          {/* Filtros de Categorías Lúdicos */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <h3
                className={`font-display font-bold text-xs tracking-tight ${
                  isNightMode ? "text-slate-300" : "text-[#2D231B]"
                }`}
              >
                Elegir por valor o emoción
              </h3>
              <span
                className={`text-xs font-display font-bold ${
                  isNightMode ? "text-slate-400" : "text-[#786C60]"
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
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-display font-bold whitespace-nowrap transition-all border-2 active:scale-95 ${
                    filterCategory === cat
                      ? "bg-storybook-coral text-white border-[#D94524] shadow-xs"
                      : isNightMode
                      ? "bg-[#1C2035] border-[#2D3352] text-slate-300 hover:text-white"
                      : "bg-white border-[#EFE6DA] text-[#6E6259] hover:border-storybook-coral"
                  }`}
                >
                  {cat === "Todos" && "🌟 Todos"}
                  {cat === "Amistad" && "🤝 Amistad"}
                  {cat === "Perseverancia" && "🚀 Perseverancia"}
                  {cat === "Naturaleza" && "🌿 Naturaleza"}
                  {cat === "Generosidad" && "🎁 Generosidad"}
                </button>
              ))}
            </div>
          </div>

          {/* Listado de Cuentos */}
          <div className="space-y-3.5 pt-1">
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
              className="rounded-[30px] p-4.5 bg-[#1F2421] text-white border-2 border-[#38433B] shadow-md cursor-pointer transition-transform hover:scale-[1.01] flex items-center justify-between mt-2"
            >
              <div className="space-y-0.5">
                <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-storybook-coral flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 fill-current" />
                  Club de Cuentos Mágicos
                </span>
                <h4 className="font-display font-bold text-sm">
                  Desbloquea todos los cuentos y perfiles
                </h4>
                <p className="text-xs text-slate-300 font-body">
                  Prueba 7 días gratis. Alterna cuando quieras.
                </p>
              </div>
              <span className="btn-toy-coral px-3 py-1.5 rounded-xl bg-storybook-coral text-white font-display font-bold text-xs shrink-0">
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
