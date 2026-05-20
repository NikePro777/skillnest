// app/page.tsx (главная страница)
import CourseFilter from '@/app/components/CourseFilter';
import { courses } from '@/app/math/courses/lessonsData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Star, ChevronRight, User } from 'lucide-react';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ШАПКА */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Scientia
              </div>
              <Badge variant="outline" className="border-indigo-500 text-indigo-600">
                Бета
              </Badge>
            </div>

            <nav className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-indigo-600 transition font-medium">
                Главная
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Курсы
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Рейтинг
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Профиль
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-orange-600">15</span>
                <span className="text-xs text-gray-500">дней</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-600">1,240</span>
                <span className="text-xs text-gray-500">XP</span>
              </div>
              <Button variant="outline" size="sm" className="border-gray-300">
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* БАННЕР */}
      <section className="py-16 text-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Математика, которая становится понятной
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Курсы для 5–11 классов. Выберите свой класс и начните обучение.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg">
            Начать обучение бесплатно
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* КОМПОНЕНТ ФИЛЬТРАЦИИ И КУРСОВ */}
      <CourseFilter initialCourses={courses} />

      {/* ФУТЕР */}
      <footer className="bg-gray-100 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 MathMaster. Курсы математики для 5–11 классов.
        </div>
      </footer>
    </div>
  );
}
