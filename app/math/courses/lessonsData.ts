// app/math/courses/lessonsData.ts

export type Lesson = {
  id: number;
  title: string;
  description: string;
  grades: number[]; // ← массив классов (например, [7,8] — тема и в 7, и в 8)
  topics: string[]; // ← темы для дополнительной фильтрации
  duration: number; // ← количество уроков/заданий
  difficulty: 1 | 2 | 3 | 4 | 5; // ← сложность
  image?: string; // ← опциональная иконка/картинка
  status: 'published' | 'coming_soon'; // ← статус
};

export const courses: Lesson[] = [
  {
    id: 1,
    title: 'Квадратные уравнения',
    description: 'От дискриминанта до теоремы Виета. 24 урока с практикой.',
    grades: [8, 9], // ← проходят и в 8, и в 9 классе
    topics: ['алгебра', 'уравнения'],
    duration: 24,
    difficulty: 3,
    status: 'published',
  },
  {
    id: 2,
    title: 'Линейные уравнения',
    description: 'Решение уравнений вида ax + b = 0. Подготовка к квадратным.',
    grades: [6, 7], // ← 6-7 классы
    topics: ['алгебра', 'уравнения'],
    duration: 12,
    difficulty: 1,
    status: 'published',
  },
  {
    id: 3,
    title: 'Обыкновенные дроби',
    description: 'Сложение, вычитание, умножение и деление дробей.',
    grades: [5, 6], // ← перекрывающаяся тема
    topics: ['арифметика', 'дроби'],
    duration: 16,
    difficulty: 2,
    status: 'published',
  },
  {
    id: 4,
    title: 'Системы уравнений',
    description: 'Методы подстановки и сложения. Решение систем 2×2.',
    grades: [9, 10],
    topics: ['алгебра', 'системы'],
    duration: 16,
    difficulty: 4,
    status: 'coming_soon',
  },
  {
    id: 5,
    title: 'Теорема Пифагора',
    description: 'Геометрия: прямоугольные треугольники и их свойства.',
    grades: [8],
    topics: ['геометрия', 'треугольники'],
    duration: 10,
    difficulty: 2,
    status: 'published',
  },
];

// Вспомогательная функция для фильтрации по классу
export function filterCoursesByGrade(courses: Lesson[], grade: number | 'all') {
  if (grade === 'all') return courses;
  return courses.filter((course) => course.grades.includes(grade));
}

// Вспомогательная функция для получения уникальных классов из всех курсов
export function getAllAvailableGrades(courses: Lesson[]): number[] {
  const gradesSet = new Set<number>();
  courses.forEach((course) => {
    course.grades.forEach((grade) => gradesSet.add(grade));
  });
  return Array.from(gradesSet).sort((a, b) => a - b);
}
