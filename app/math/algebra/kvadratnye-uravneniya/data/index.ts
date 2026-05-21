import { Lesson } from '../[id]/types';
import { lesson1 } from './lesson1';

// Только существующие уроки
export const lessons: Partial<Record<number, Lesson>> = {
  1: lesson1,
};

export function getLesson(id: number): Lesson | null {
  return lessons[id] || null;
}

// Для удобства — массив существующих ID
export const existingLessonIds = Object.keys(lessons).map(Number);
