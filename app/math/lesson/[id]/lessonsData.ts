export type Lesson = {
  title: string;
  description: string;
  question: string;
  options: string[];
  correct: string;
  hint: string;
};

export const lessons: Record<number, Lesson> = {
  1: {
    title: 'Что такое квадратное уравнение?',
    description: 'Узнаем, как выглядит квадратное уравнение и из чего оно состоит.',
    question: 'Какая степень у переменной x в квадратном уравнении?',
    options: ['1', '2', '3', '4'],
    correct: '2',
    hint: "Слово 'квадратное' происходит от 'квадрат' — вторая степень.",
  },
  // TODO: добавить уроки 2, 3, 4...24
};
