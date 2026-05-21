'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Star, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import {
  courses,
  filterCoursesByGrade,
  getAllAvailableGrades,
  Lesson,
} from '@/app/math/courses/lessonsData';
import { getFirstLessonPath } from '@/app/math/courses/lessonsData';

const GRADES = [5, 6, 7, 8, 9, 10, 11];

export default function CourseFilter({ initialCourses }: { initialCourses: Lesson[] }) {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all');

  // Получаем все доступные темы из курсов
  const allTopics = Array.from(new Set(initialCourses.flatMap((course) => course.topics))).sort();

  // Фильтруем курсы
  let filteredCourses = filterCoursesByGrade(initialCourses, selectedGrade);

  if (selectedTopic !== 'all') {
    filteredCourses = filteredCourses.filter((course) => course.topics.includes(selectedTopic));
  }

  return (
    <div>
      {/* Панель фильтрации */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          {/* Фильтр по классам */}
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-2">Класс</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedGrade('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedGrade === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                Все классы
              </button>
              {GRADES.map((grade) => {
                // Показываем только классы, для которых есть курсы
                const hasCourses = initialCourses.some((c) => c.grades.includes(grade));
                if (!hasCourses) return null;

                return (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      selectedGrade === grade
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    {grade} класс
                  </button>
                );
              })}
            </div>
          </div>

          {/* Фильтр по темам */}
          {allTopics.length > 0 && (
            <div>
              <div className="text-sm text-gray-500 mb-2">Тема</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all whitespace-nowrap ${
                    selectedTopic === 'all'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  Все темы
                </button>
                {allTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all whitespace-nowrap ${
                      selectedTopic === topic
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Результаты фильтрации */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedGrade === 'all' ? 'Все курсы' : `${selectedGrade} класс`}
            {selectedTopic !== 'all' && ` · ${selectedTopic}`}
          </h2>
          <div className="text-sm text-gray-500">Найдено {filteredCourses.length} курсов</div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">Курсов не найдено</p>
            <button
              onClick={() => {
                setSelectedGrade('all');
                setSelectedTopic('all');
              }}
              className="mt-2 text-indigo-600 hover:underline">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-1">
                      {course.grades.map((grade) => (
                        <Badge key={grade} variant="outline" className="text-xs bg-gray-50">
                          {grade} кл.
                        </Badge>
                      ))}
                    </div>
                    {course.status === 'coming_soon' ? (
                      <Badge className="bg-amber-100 text-amber-700 border-0">Скоро</Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-yellow-300 text-yellow-600 bg-yellow-50">
                        <Star className="w-3 h-3 inline mr-1 fill-yellow-500" />
                        {course.duration} уроков
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-3 text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        #{topic}
                      </span>
                    ))}
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration} уроков
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={getFirstLessonPath(course.id)} className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                      Начать курс
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
