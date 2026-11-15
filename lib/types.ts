export type ValueCategory = 
  | "Amistad" 
  | "Valentía" 
  | "Perseverancia" 
  | "Naturaleza" 
  | "Generosidad" 
  | "Curiosidad";

export interface ChildProfile {
  name: string;
  age: number;
  petName: string;
  starsCount: number;
  favoriteValue: ValueCategory;
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
  nodes: Record<string, StoryNode>;
}
