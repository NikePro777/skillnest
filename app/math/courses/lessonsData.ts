// app/math/courses/lessonsData.ts

export type Lesson = {
  id: number;
  title: string;
  description: string;
  grades: number[]; // массив классов (например, [7,8] — тема и в 7, и в 8)
  topics: string[]; // темы для дополнительной фильтрации
  duration: number; // количество уроков/заданий
  difficulty: 1 | 2 | 3 | 4 | 5; // сложность
  image?: string; // опциональная иконка/картинка
  status: 'published' | 'coming_soon'; // статус
};

export const courses: Lesson[] = [
  {
    id: 1,
    title: 'Квадратные уравнения',
    description: 'От дискриминанта до теоремы Виета. 24 урока с практикой.',
    grades: [8, 9],
    topics: ['алгебра', 'уравнения'],
    duration: 24,
    difficulty: 3,
    status: 'published',
  },
  {
    id: 2,
    title: 'Линейные уравнения',
    description: 'Решение уравнений вида ax + b = 0. Подготовка к квадратным.',
    grades: [6, 7],
    topics: ['алгебра', 'уравнения'],
    duration: 12,
    difficulty: 1,
    status: 'published',
  },
  {
    id: 3,
    title: 'Обыкновенные дроби',
    description: 'Сложение, вычитание, умножение и деление дробей.',
    grades: [5, 6],
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

// ========== НОВЫЙ КОД: МАППИНГ НАЗВАНИЙ НА ЛАТИНИЦУ ==========

// Явное соответствие между названием курса и slug (частью URL)
const slugMap: Record<string, string> = {
  'Квадратные уравнения': 'kvadratnye-uravneniya',
  'Линейные уравнения': 'lineynye-uravneniya',
  'Обыкновенные дроби': 'obyknovennye-drobi',
  'Системы уравнений': 'sistemy-uravneniy',
  'Теорема Пифагора': 'teorema-pifagora',
};

// Функция для получения slug из названия
function getSlug(title: string): string {
  // Если есть в маппинге — используем
  if (slugMap[title]) {
    return slugMap[title];
  }

  // Если нет — транслитерация (запасной вариант)
  const translitMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return title
    .toLowerCase()
    .split('')
    .map((char) => translitMap[char] || (char.match(/[a-z0-9]/) ? char : ''))
    .join('')
    .replace(/ /g, '-')
    .replace(/-+/g, '-');
}

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

// Добавляем поле path к каждому курсу (для ссылок)
export type CourseWithPath = Lesson & {
  path: string; // путь к папке с уроками
};

// Расширяем массив курсов путями
export const coursesWithPaths: CourseWithPath[] = courses.map((course) => {
  const slug = getSlug(course.title);
  return {
    ...course,
    path: `/math/algebra/${slug}`,
  };
});

// Функция для получения пути к первому уроку курса
export function getFirstLessonPath(courseId: number): string {
  const course = coursesWithPaths.find((c) => c.id === courseId);
  if (!course) return '/';
  return `${course.path}/1?difficulty=light`;
}
