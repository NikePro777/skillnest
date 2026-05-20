'use client'; // ← ЭТО КЛЮЧЕВОЙ МОМЕНТ!

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { type Lesson, lessons } from './lessonsData';

export default function LessonClient({ lesson, lessonId }: { lesson: Lesson; lessonId: number }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = checked && selected === lesson.correct;

  const handleCheck = () => {
    if (selected) setChecked(true);
  };

  const handleNext = () => {
    const nextLessonId = lessonId + 1;

    if (lessons[nextLessonId]) {
      router.push(`/math/lesson/${nextLessonId}`);
    } else {
      alert('🎉 Поздравляем! Вы прошли все уроки курса!');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600">
            <ArrowLeft className="w-4 h-4" /> На главную
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>Урок {lessonId} из 24</span>
          <span>0 XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${(lessonId / 24) * 100}%` }}></div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <Badge className="mx-auto w-fit bg-indigo-100 text-indigo-700">Урок {lessonId}</Badge>
            <CardTitle className="text-2xl mt-2">{lesson.title}</CardTitle>
            <p className="text-gray-500 text-sm">{lesson.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-gray-500 mb-1">Вопрос</div>
              <div className="text-xl font-medium">{lesson.question}</div>
            </div>

            <div className="grid gap-3">
              {lesson.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelected(opt);
                    setChecked(false);
                  }}
                  className={`
                    p-3 text-left rounded-xl border-2 transition-all
                    ${selected === opt ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}
                    ${checked && opt === lesson.correct ? 'border-green-500 bg-green-50' : ''}
                    ${checked && selected === opt && opt !== lesson.correct ? 'border-red-500 bg-red-50' : ''}
                  `}>
                  {opt}
                </button>
              ))}
            </div>

            {!checked && selected && (
              <Button onClick={handleCheck} className="w-full bg-indigo-600 hover:bg-indigo-700">
                Проверить <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            {checked && (
              <div
                className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex gap-3 items-start">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Правильно!' : 'Неправильно'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm">
                        Правильный ответ: {lesson.correct}. {lesson.hint}
                      </p>
                    )}
                    {isCorrect && <p className="text-sm text-green-700">Отлично! +10 XP</p>}
                  </div>
                </div>
                {isCorrect && (
                  <Button
                    onClick={handleNext}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Следующий урок <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            )}

            {!checked && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="text-gray-400 text-sm flex items-center gap-1 mx-auto">
                <Lightbulb className="w-3 h-3" /> Подсказка
              </button>
            )}
            {showHint && (
              <div className="text-sm bg-yellow-50 p-3 rounded-xl text-yellow-800">
                💡 {lesson.hint}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
