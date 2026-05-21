import { Lesson } from '../[id]/types';

export const lesson1: Lesson = {
  id: 1,
  title: 'Что такое квадратное уравнение?',
  description: 'Узнаем, как выглядит квадратное уравнение',
  difficulties: {
    light: {
      id: 'light',
      name: 'Лёгкий',
      icon: '🌱',
      isPremium: false,
      totalXp: 30,
      steps: [
        {
          id: 1,
          type: 'theory',
          content:
            '📖 **Квадратное уравнение** — это уравнение вида:\n\n**ax² + bx + c = 0**, где **a ≠ 0**\n\n• a — старший коэффициент (при x²)\n• b — коэффициент при x\n• c — свободный член',
          xp: 0,
        },
        {
          id: 2,
          type: 'question',
          content: 'Какая степень у переменной x в квадратном уравнении?',
          options: ['1', '2', '3', '4'],
          correct: '2',
          hint: 'Слово "квадратное" происходит от "квадрат" — вторая степень',
          xp: 10,
        },
        {
          id: 3,
          type: 'practice',
          content: 'Найди коэффициент **a** в уравнении: **x² - 4x + 3 = 0**',
          options: ['0', '1', '-4', '3'],
          correct: '1',
          hint: 'Перед x² ничего не написано, значит a = 1',
          xp: 10,
        },
        {
          id: 4,
          type: 'practice',
          content: 'Найди коэффициент **b** в уравнении: **x² - 4x + 3 = 0**',
          options: ['1', '-4', '4', '3'],
          correct: '-4',
          hint: 'b — это число перед x (обрати внимание на знак!)',
          xp: 10,
        },
        {
          id: 5,
          type: 'congrats',
          content:
            '🎉 **Отлично!** Ты научился находить коэффициенты квадратного уравнения!\n\n+30 XP',
          xp: 0,
        },
      ],
    },
    medium: null,
    hard: null,
  },
};
