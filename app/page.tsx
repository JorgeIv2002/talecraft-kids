"use client";

import React, { useState, useEffect } from "react";
import AndroidShell from "@/components/AndroidShell";
import HeaderProfile from "@/components/HeaderProfile";
import StoryCard from "@/components/StoryCard";
import StoryReader from "@/components/StoryReader";
import PersonalizeModal from "@/components/PersonalizeModal";
import ProMembershipModal from "@/components/ProMembershipModal";
import { INITIAL_STORIES } from "@/lib/storiesData";
import { Story, ChildProfile, ValueCategory } from "@/lib/types";
import { Sparkles, Moon, Sun, ArrowRight, ShieldCheck, Flame } from "lucide-react";

export default function Home() {
  const [stories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "create" | "pro">("library");
  const [filterCategory, setFilterCategory] = useState<string>("Todos");

  // Perfil Infantil en Estado Local persistente
  const [profile, setProfile] = useState<ChildProfile>({
    name: "Leo",
    age: 7,
    petName: "Chispas el perrito",
    starsCount: 14,
    favoriteValue: "Amistad",
  });

  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);

  // Cargar estado guardado al iniciar
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("talecraft_profile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      const savedNight = localStorage.getItem("talecraft_night");
      if (savedNight) {
        setIsNightMode(JSON.parse(savedNight));
      }
    } catch {
      // Ignorar errores de localStorage en SSR
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

  const handleSaveProfile = (updated: ChildProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem("talecraft_profile", JSON.stringify(updated));
    } catch {}
  };

  const handleAwardStars = (count: number) => {
    setProfile((prev) => {
      const updated = { ...prev, starsCount: prev.starsCount + count };
      try {
        localStorage.setItem("talecraft_profile", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleTabChange = (tab: "library" | "create" | "pro") => {
    if (tab === "create") {
      setIsPersonalizeOpen(true);
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
      profile={profile}
      isNightMode={isNightMode}
      onToggleNightMode={handleToggleNightMode}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {/* VISTA A: LECTOR ACTIVO DE CUENTO */}
      {selectedStory ? (
        <StoryReader
          story={selectedStory}
          profile={profile}
          isNightMode={isNightMode}
          onExit={() => setSelectedStory(null)}
          onAwardStars={handleAwardStars}
        />
      ) : (
        /* VISTA B: BIBLIOTECA Y EXPLORADOR DE CUENTOS */
        <div className="space-y-4">
          {/* Header con Perfil del Niño */}
          <HeaderProfile
            profile={profile}
            isNightMode={isNightMode}
            onOpenPersonalize={() => setIsPersonalizeOpen(true)}
          />

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
                🌿 Cuento Recomendado
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isNightMode ? "text-slate-400" : "text-ink-secondary"
                }`}
              >
                ⏱ 5 min • Noche
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
              <span>Comenzar Aventura con {profile.name}</span>
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
              {["Todos", "Amistad", "Perseverancia", "Naturaleza"].map((cat) => (
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
                onSelect={(s) => setSelectedStory(s)}
              />
            ))}
          </div>

          {/* Banner Club Pro Familiar */}
          <div
            onClick={() => setIsProOpen(true)}
            className="rounded-3xl p-4 bg-[#1F2421] text-white border border-[#2F3732] shadow-md cursor-pointer touch-press flex items-center justify-between mt-2"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-storybook-coral">
                Club de Cuentos Mágicos
              </span>
              <h4 className="font-display font-bold text-xs">
                Desbloquea más de 50 aventuras
              </h4>
              <p className="text-[10px] text-slate-300">
                Historias ilimitadas sin anuncios por $6.99/mes
              </p>
            </div>
            <span className="px-2.5 py-1.5 rounded-xl bg-storybook-coral text-white font-display font-bold text-[11px] shrink-0">
              Ver Pro →
            </span>
          </div>
        </div>
      )}

      {/* Modales */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        isNightMode={isNightMode}
      />

      <ProMembershipModal
        isOpen={isProOpen}
        onClose={() => setIsProOpen(false)}
        isNightMode={isNightMode}
      />
    </AndroidShell>
  );
}
