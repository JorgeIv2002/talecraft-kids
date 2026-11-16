"use client";

import React, { useState, useEffect } from "react";
import AndroidShell from "@/components/AndroidShell";
import HeaderProfile from "@/components/HeaderProfile";
import VooksHeroBanner from "@/components/VooksHeroBanner";
import VooksCategoryCircles from "@/components/VooksCategoryCircles";
import VooksSectionRow from "@/components/VooksSectionRow";
import StoryReader from "@/components/StoryReader";
import PersonalizeModal from "@/components/PersonalizeModal";
import ProMembershipModal from "@/components/ProMembershipModal";
import StoryCreatorModal from "@/components/StoryCreatorModal";
import { useLanguage } from "@/context/LanguageContext";
import StarShopModal from "@/components/StarShopModal";
import { INITIAL_STORIES } from "@/lib/storiesData";
import { Story, ChildProfile, RewardItem } from "@/lib/types";
import { Crown, Sparkles, Wand2, Headphones, Star, Download } from "lucide-react";

export default function Home() {
  const { t, locale } = useLanguage();
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "create" | "pro" | "shop">("library");
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>("Todos");

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

  // Colecciones estilo Vooks
  const popularStories = stories.filter((s) => s.collection === "popular");
  const bedtimeStories = stories.filter((s) => s.collection === "bedtime");
  const valueStories = stories.filter((s) => s.collection === "values");
  const audioStories = stories.filter((s) => s.collection === "audio" || s.isAudioOnly);

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
        /* VISTA B: BIBLIOTECA ESTILO VOOKS */
        <div className="space-y-5">
          {/* Header Superior con Logo Estilo Vooks y Perfil */}
          <div className="flex items-center justify-between pt-1">
            <HeaderProfile
              profile={currentProfile}
              profilesList={profilesList}
              onSelectChild={handleSelectChild}
              isNightMode={isNightMode}
              isPro={isPro}
              onOpenPersonalize={() => setIsPersonalizeOpen(true)}
              onOpenShop={() => setIsShopOpen(true)}
            />
          </div>

          {/* Logo Central de la Marca Estilo Vooks */}
          <div className="text-center py-0.5 space-y-2">
            <div>
              <span className="font-display font-black text-2xl tracking-wider text-storybook-coral uppercase drop-shadow-2xs">
                TALECRAFT
              </span>
              <span className="block text-[10px] font-display font-bold text-[#786C60] dark:text-slate-400 tracking-wide uppercase">
                {locale === "en" ? "Stories that come alive" : "Cuentos que cobran vida"}
              </span>
            </div>

            {/* Botón Visible de Descarga App Android (.apk) */}
            <div className="flex justify-center pt-0.5">
              <a
                href="https://github.com/JorgeIv2002/talecraft-kids/releases/download/v1.0.0/app-android.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-display font-bold text-xs shadow-md border-2 border-emerald-400/50 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-emerald-200 animate-bounce" />
                <span>{t.header.downloadApp}</span>
              </a>
            </div>
          </div>

          {/* 1. Tarjeta Cinematográfica Hero Estilo Vooks */}
          <VooksHeroBanner
            story={featuredStory}
            profile={currentProfile}
            isNightMode={isNightMode}
            onStartStory={(s) => setSelectedStory(s)}
          />

          {/* 2. Círculos de Categorías Rápidas Estilo Vooks */}
          <VooksCategoryCircles
            activeCategory={activeFilterCategory}
            onSelectCategory={(cat) => setActiveFilterCategory(cat)}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenAudio={() => {
              const firstAudio = stories.find((s) => s.isAudioOnly);
              if (firstAudio) setSelectedStory(firstAudio);
            }}
            isNightMode={isNightMode}
          />

          {/* 3. Filas de Desplazamiento Horizontal estilo Vooks / Netflix Kids */}
          <div className="space-y-6 pt-1">
            {/* Fila 1: Populares y Destacados */}
            <VooksSectionRow
              title={t.sections.popularTitle}
              subtitle={t.sections.popularSub}
              stories={popularStories}
              isNightMode={isNightMode}
              isPro={isPro}
              onSelectStory={(s) => setSelectedStory(s)}
              onRequestPro={() => setIsProOpen(true)}
            />

            {/* Fila 2: Cuentos para Dormir (Bedtime Stories) */}
            <VooksSectionRow
              title={t.sections.bedtimeTitle}
              subtitle={t.sections.bedtimeSub}
              stories={bedtimeStories}
              isNightMode={isNightMode}
              isPro={isPro}
              onSelectStory={(s) => setSelectedStory(s)}
              onRequestPro={() => setIsProOpen(true)}
            />

            {/* Fila 3: Audioteca Sin Pantalla (Screen-Free Audio) */}
            <div className="rounded-[30px] p-4 bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white space-y-3 shadow-md border-2 border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-2xl bg-white/20 text-xl">🎧</span>
                  <div>
                    <h3 className="font-display font-bold text-sm">
                      {locale === "en" ? "Magic Audio Library" : "Audioteca Mágica"}
                    </h3>
                    <p className="text-[11px] text-white/80 font-body">
                      {locale === "en" ? "Listen with eyes closed before sleeping" : "Escucha con los ojos cerrados antes de dormir"}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-950 font-display font-black text-[10px] uppercase">
                  {locale === "en" ? "NEW" : "NUEVO"}
                </span>
              </div>

              {audioStories.map((audioStory) => (
                <div
                  key={audioStory.id}
                  onClick={() => setSelectedStory(audioStory)}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-between cursor-pointer border border-white/15"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{audioStory.coverEmoji}</span>
                    <div>
                      <h4 className="font-display font-bold text-xs">{audioStory.title}</h4>
                      <span className="text-[10px] text-white/80 font-body">
                        {locale === "en" ? "⏱ 10 min • Forest & harp sounds" : "⏱ 10 min • Sonido de bosque y arpa"}
                      </span>
                    </div>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white text-[#0284C7] flex items-center justify-center font-display font-bold text-xs shadow-sm">
                    ▶
                  </span>
                </div>
              ))}
            </div>

            {/* Fila 4: Aventuras y Valores */}
            <VooksSectionRow
              title={t.sections.forestTitle}
              subtitle={t.sections.forestSub}
              stories={valueStories}
              isNightMode={isNightMode}
              isPro={isPro}
              onSelectStory={(s) => setSelectedStory(s)}
              onRequestPro={() => setIsProOpen(true)}
            />
          </div>

          {/* Banner de Membresía Familiar Estilo Vooks ("Hundreds of stories kids love") */}
          {!isPro ? (
            <div
              onClick={() => setIsProOpen(true)}
              className="rounded-[34px] p-5 bg-gradient-to-br from-[#FF6B4A] via-[#F05735] to-[#D94524] text-white shadow-lg cursor-pointer transition-transform hover:scale-[1.01] flex items-center justify-between border-2 border-white/20 mt-3"
            >
              <div className="space-y-1 max-w-[240px]">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-display font-bold uppercase tracking-wider">
                  {t.pro.badge}
                </span>
                <h4 className="font-display font-bold text-base leading-tight">
                  {t.bannerPro.title}
                </h4>
                <p className="text-[11px] text-white/90 font-body">
                  {t.bannerPro.subtitle}
                </p>
              </div>
              <span className="btn-toy-coral px-3.5 py-2.5 rounded-2xl bg-white text-storybook-coral hover:bg-[#FFF5EB] font-display font-extrabold text-xs shrink-0 shadow-md">
                {t.bannerPro.explore}
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
