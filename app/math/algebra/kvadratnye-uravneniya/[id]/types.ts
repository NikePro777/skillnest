// Типы для уроков этого курса
export type LessonStep = {
  id: number;
  type: 'theory' | 'question' | 'practice' | 'motivation' | 'congrats';
  title?: string;
  content: string;
  options?: string[];
  correct?: string;
  hint?: string;
  explanation?: string;
  xp: number;
};

export type DifficultyLevel = {
  id: 'light' | 'medium' | 'hard';
  name: string;
  icon: string;
  isPremium: boolean;
  steps: LessonStep[];
  totalXp: number;
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  difficulties: {
    light: DifficultyLevel;
    medium: DifficultyLevel | null;
    hard: DifficultyLevel | null;
  };
};
