// app/math/algebra/kvadratnye-uravneniya/[id]/types.ts

import { TheoryContent } from '@/components/common/TheoryTypes';

export type LessonStep = {
  id: number;
  type: 'theory' | 'training' | 'question' | 'practice' | 'motivation' | 'congrats';
  title?: string;
  content: string | TheoryContent; // ← может быть строкой (старый формат) или TheoryContent
  options?: string[];
  correct?: string;
  hint?: string;
  explanation?: string;
  xp: number;
  allowInfiniteAttempts?: boolean;
  taskBank?: string;
  tasksPerStep?: number;
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
