// app/math/algebra/kvadratnye-uravneniya/data/lesson1.ts

import { Lesson } from '../[id]/types';
import { TheoryContent } from '@/components/common/TheoryTypes';

export const lesson1: Lesson = {
  id: 1,
  title: 'Что такое квадратное уравнение?',
  description: 'Узнаем, как выглядит квадратное уравнение и находим его коэффициенты',
  difficulties: {
    // ========== ЛЁГКИЙ УРОВЕНЬ (теория + тренировка) ==========
    light: {
      id: 'light',
      name: 'Лёгкий',
      icon: '🌱',
      isPremium: false,
      totalXp: 0, // Теория не даёт XP
      steps: [
        // --- ТЕОРИЯ (шаг 1) ---
        {
          id: 1,
          type: 'theory',
          content: {
            title: 'Квадратное уравнение',
            description: 'Квадратное уравнение — это уравнение, которое можно записать в виде:',
            formula: {
              latex: 'ax² + bx + c = 0, где a ≠ 0',
              highlight: ['a', 'b', 'c'],
            },
            coefficients: {
              a: {
                description: 'коэффициент при x² (не может быть равен 0)',
                note: 'если перед x² ничего нет, то a = 1',
              },
              b: {
                description: 'коэффициент при x',
                note: 'если нет члена с x, то b = 0',
              },
              c: {
                description: 'свободный член (число без x)',
                note: 'если нет числа, то c = 0',
              },
            },
            examples: [
              { formula: '2x² - 4x + 3 = 0', a: 2, b: -4, c: 3 },
              { formula: 'x² + 5x = 0', a: 1, b: 5, c: 0 },
              { formula: '3x² - 12 = 0', a: 3, b: 0, c: -12 },
            ],
            warning: 'a не может быть равно 0, иначе уравнение станет линейным!',
          } as TheoryContent,
          xp: 0,
        },

        // --- ТРЕНИРОВКА 1: находим a ---
        {
          id: 2,
          type: 'training',
          content: '🎯 **Тренировка 1:** Найди коэффициент **a** в уравнении: **x² - 4x + 3 = 0**',
          options: ['0', '1', '-4', '3'],
          correct: '1',
          hint: 'Перед x² ничего не написано → a = 1',
          explanation: 'Правильно! Перед x² стоит невидимая единица.',
          xp: 0,
          allowInfiniteAttempts: true,
        },

        // --- ТРЕНИРОВКА 2: находим b ---
        {
          id: 3,
          type: 'training',
          content: '🎯 **Тренировка 2:** Найди коэффициент **b** в уравнении: **x² - 4x + 3 = 0**',
          options: ['1', '-4', '4', '3'],
          correct: '-4',
          hint: 'b — число перед x, не забудь про знак!',
          explanation: 'Верно! b = -4, потому что перед x стоит -4.',
          xp: 0,
          allowInfiniteAttempts: true,
        },

        // --- ТРЕНИРОВКА 3: находим c ---
        {
          id: 4,
          type: 'training',
          content: '🎯 **Тренировка 3:** Найди коэффициент **c** в уравнении: **x² - 4x + 3 = 0**',
          options: ['1', '-4', '4', '3'],
          correct: '3',
          hint: 'c — число без x (свободный член)',
          explanation: 'Отлично! c = 3.',
          xp: 0,
          allowInfiniteAttempts: true,
        },

        // --- ТРЕНИРОВКА 4: находим a в другом уравнении ---
        {
          id: 5,
          type: 'training',
          content: '🎯 **Тренировка 4:** Найди коэффициент **a** в уравнении: **3x² + 2x - 1 = 0**',
          options: ['1', '2', '3', '-1'],
          correct: '3',
          hint: 'a — число перед x²',
          explanation: 'Правильно! a = 3.',
          xp: 0,
          allowInfiniteAttempts: true,
        },

        // --- ТРЕНИРОВКА 5: находим b в другом уравнении ---
        {
          id: 6,
          type: 'training',
          content: '🎯 **Тренировка 5:** Найди коэффициент **b** в уравнении: **3x² + 2x - 1 = 0**',
          options: ['1', '2', '3', '-1'],
          correct: '2',
          hint: 'b — число перед x',
          explanation: 'Верно! b = 2.',
          xp: 0,
          allowInfiniteAttempts: true,
        },

        // --- ПОЗДРАВЛЕНИЕ ---
        {
          id: 7,
          type: 'congrats',
          content:
            '🎉 **Ты освоил теорию!** Теперь можешь проверить себя в игре.\n\nВыбери уровень сложности:',
          xp: 0,
        },
      ],
    },

    // ========== СРЕДНИЙ УРОВЕНЬ (будет позже) ==========
    medium: null,

    // ========== СЛОЖНЫЙ УРОВЕНЬ (будет позже) ==========
    hard: null,
  },
};
