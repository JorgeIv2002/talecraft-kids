export type ValueCategory = 
  | "Amistad" 
  | "Valentía" 
  | "Perseverancia" 
  | "Naturaleza" 
  | "Generosidad" 
  | "Curiosidad";

export interface RewardItem {
  id: string;
  name: string;
  type: "pet" | "accessory" | "sound";
  costStars: number;
  emoji: string;
  description: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  petName: string;
  starsCount: number;
  favoriteValue: ValueCategory;
  avatarEmoji?: string;
  equippedAccessory?: string;
  equippedSound?: string;
  unlockedRewards: string[];
}

export interface StoryChoice {
  id: string;
  label: string;
  hint: string;
  nextNodeId: string;
  lessonTitle?: string;
  lessonDesc?: string;
}

export interface StoryNode {
  id: string;
  chapterNumber: number;
  totalChapters: number;
  sceneEmoji: string;
  text: string;
  isEnding?: boolean;
  moralLesson?: {
    title: string;
    description: string;
    starsAwarded: number;
  };
  choices?: StoryChoice[];
}

export interface Story {
  id: string;
  title: string;
  synopsis: string;
  valueCategory: ValueCategory;
  estimatedMinutes: number;
  coverEmoji: string;
  accentColor: string;
  decisionsCount: number;
  startNodeId: string;
  isPremium?: boolean;
  isAudioOnly?: boolean;
  collection: "popular" | "bedtime" | "values" | "audio";
  gradientBg: string;
  coverImageDesc?: string;
  nodes: Record<string, StoryNode>;
}
