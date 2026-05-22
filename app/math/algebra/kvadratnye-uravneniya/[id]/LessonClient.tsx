'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ChevronRight, Lightbulb, Lock, Star, Flame } from 'lucide-react';
import Link from 'next/link';
import { Lesson, DifficultyLevel } from './types';
import ReactMarkdown from 'react-markdown';

type LessonClientProps = {
  lesson: Lesson;
  lessonId: number;
  difficultyId: 'light' | 'medium' | 'hard';
  hasPremiumAccess: boolean;
};

export default function LessonClient({
  lesson,
  lessonId,
  difficultyId,
  hasPremiumAccess,
}: LessonClientProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [theoryCompleted, setTheoryCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showChoiceDialog, setShowChoiceDialog] = useState(false);
  const [showMediumChoiceDialog, setShowMediumChoiceDialog] = useState(false);
  const [showHardChoiceDialog, setShowHardChoiceDialog] = useState(false);
  const difficulty = lesson.difficulties[difficultyId];

  // Проверка существования уровня
  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md text-center p-6">
          <h2 className="text-2xl font-bold mb-2">Уровень не найден</h2>
          <p className="text-gray-600 mb-4">Выберите другой уровень сложности</p>
          <Link href="/">
            <Button>На главную</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Проверка доступа к платному уровню
  if (difficulty.isPremium && !hasPremiumAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md text-center p-6">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Доступ ограничен</h2>
          <p className="text-gray-600 mb-4">
            Уровень «{difficulty.name}» доступен в премиум-версии
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Получить доступ за 990 ₽</Button>
        </Card>
      </div>
    );
  }

  const currentStep = difficulty.steps[currentStepIndex];
  const isLastStep = currentStepIndex === difficulty.steps.length - 1;

  const handleCheck = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentStep.correct;

    // В handleCheck для тренировочных заданий (allowInfiniteAttempts)
    if (currentStep.allowInfiniteAttempts) {
      if (isCorrect) {
        // Просто показываем правильность и переходим дальше
        if (!isLastStep) {
          setCurrentStepIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
        } else {
          setTheoryCompleted(true);
        }
      } else {
        // Неправильно — не теряем жизни, просто показываем объяснение
        setShowExplanation(true);
      }
      return;
    }

    if (isCorrect) {
      // Начисляем XP
      setEarnedXp((prev) => prev + currentStep.xp);

      // Проверяем, последний ли это шаг
      if (!isLastStep) {
        // Переход к следующему шагу
        setCurrentStepIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowHint(false);
        setShowExplanation(false);
      } else {
        // УРОК ЗАВЕРШЁН!
        if (difficultyId === 'light') {
          // Для лёгкого уровня — показываем выбор
          setShowChoiceDialog(true);
        } else if (difficultyId === 'medium') {
          setShowMediumChoiceDialog(true);
        } else if (difficultyId === 'hard') {
          setShowHardChoiceDialog(true);
        } else {
          // Для среднего/сложного — завершаем
          alert(`🎉 Урок пройден! Ты заработал ${earnedXp + currentStep.xp} XP`);
          router.push('/');
        }
      }
    } else {
      // Неправильный ответ
      setShowExplanation(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600">
              <ArrowLeft className="w-4 h-4" /> На главную
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-orange-600">15</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-600">{earnedXp}</span>
                <span className="text-xs text-gray-500">XP</span>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700">
                {difficulty.icon} {difficulty.name}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Прогресс урока */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>
              Шаг {currentStepIndex + 1} из {difficulty.steps.length}
            </span>
            <span>
              {earnedXp} / {difficulty.totalXp} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentStepIndex + 1) / difficulty.steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Карточка шага */}
        <Card>
          <CardHeader className="text-center">
            <Badge className="mx-auto w-fit mb-2">
              {currentStep.type === 'theory' && '📖 ТЕОРИЯ'}
              {currentStep.type === 'question' && '❓ ВОПРОС'}
              {currentStep.type === 'practice' && '✍️ ПРАКТИКА'}
              {currentStep.type === 'motivation' && '💪 МОТИВАЦИЯ'}
              {currentStep.type === 'congrats' && '🎉 ПОЗДРАВЛЕНИЕ'}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 1. КОНТЕНТ ДЛЯ ТЕОРИИ (особое оформление) */}
            {currentStep.type === 'theory' && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📖</span>
                  <span className="font-semibold text-blue-800">Новое понятие</span>
                </div>
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown>{currentStep.content}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* 2. КОНТЕНТ ДЛЯ ВОПРОСОВ И ПРАКТИКИ (добавляем этот блок!) */}
            {(currentStep.type === 'question' || currentStep.type === 'practice') && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{currentStep.type === 'question' ? '❓' : '✍️'}</span>
                  <span className="font-semibold text-gray-700">
                    {currentStep.type === 'question' ? 'Вопрос' : 'Практика'}
                  </span>
                </div>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{currentStep.content}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* 3. ВАРИАНТЫ ОТВЕТОВ (для вопросов и практики) */}
            {currentStep.options && (
              <div className="grid gap-3">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedAnswer(opt);
                      setShowHint(false);
                      setShowExplanation(false);
                    }}
                    className={`
            p-3 text-left rounded-xl border-2 transition-all
            ${
              selectedAnswer === opt
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }
          `}>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* 4. КНОПКА "ПРОВЕРИТЬ" (для шагов с вариантами) */}
            {currentStep.options && selectedAnswer && !showExplanation && (
              <Button onClick={handleCheck} className="w-full bg-indigo-600 hover:bg-indigo-700">
                Проверить <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            {/* 5. КНОПКА "ДАЛЕЕ" (для теории) */}
            {!currentStep.options && currentStep.type !== 'congrats' && (
              <Button
                onClick={() => {
                  if (!isLastStep) {
                    setCurrentStepIndex((prev) => prev + 1);
                  } else {
                    alert(`🎉 Урок пройден! Ты заработал ${earnedXp} XP`);
                    router.push('/');
                  }
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700">
                Далее
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            {/* 6. ОБЪЯСНЕНИЕ ОШИБКИ */}
            {showExplanation && currentStep.correct && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <p className="font-semibold text-red-800 mb-2">❌ Неправильно</p>
                <p className="text-red-700">Правильный ответ: {currentStep.correct}</p>
                {currentStep.hint && (
                  <p className="text-red-600 mt-2 text-sm">💡 {currentStep.hint}</p>
                )}
                <Button
                  onClick={() => setShowExplanation(false)}
                  variant="outline"
                  className="mt-3 w-full">
                  Попробовать ещё
                </Button>
              </div>
            )}

            {/* 7. ПОДСКАЗКА */}
            {currentStep.hint && !showHint && currentStep.options && !showExplanation && (
              <button
                onClick={() => setShowHint(true)}
                className="text-gray-400 text-sm flex items-center gap-1 mx-auto">
                <Lightbulb className="w-3 h-3" /> Нужна подсказка?
              </button>
            )}
            {showHint && currentStep.hint && (
              <div className="text-sm bg-yellow-50 p-3 rounded-xl text-yellow-800">
                💡 {currentStep.hint}
              </div>
            )}
            {/* КНОПКА "ЗАВЕРШИТЬ УРОК" (для конгратс) */}
            {currentStep.type === 'congrats' && (
              <Button
                onClick={() => {
                  if (difficultyId === 'light') {
                    setShowChoiceDialog(true);
                  } else if (difficultyId === 'medium') {
                    setShowMediumChoiceDialog(true);
                  } else if (difficultyId === 'hard') {
                    setShowHardChoiceDialog(true); // ← ЭТО ДОЛЖНО БЫТЬ
                  } else {
                    alert(`🎉 Урок пройден! Ты заработал ${earnedXp} XP`);
                    router.push('/');
                  }
                }}
                className="w-full bg-green-600 hover:bg-green-700">
                Завершить урок
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </CardContent>
        </Card>
        {/* Модальное окно выбора после лёгкого уровня */}
        {showChoiceDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 text-center shadow-2xl">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Отлично!</h2>
              <p className="text-gray-600 mb-6">
                Ты прошёл первый урок на 🌱 лёгком уровне!
                <br />
                Хочешь продолжить практику по этой теме?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowChoiceDialog(false);
                    router.push(
                      `/math/algebra/kvadratnye-uravneniya/${lessonId}?difficulty=medium`,
                    );
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  🔥 Средний уровень (+20 XP)
                </button>

                <button
                  onClick={() => {
                    setShowChoiceDialog(false);
                    router.push(`/math/algebra/kvadratnye-uravneniya/${lessonId}?difficulty=hard`);
                  }}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  💪 Сложный уровень (+30 XP, Premium)
                </button>

                <button
                  onClick={() => {
                    setShowChoiceDialog(false);
                    router.push('/');
                  }}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all">
                  → На главную
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Сложный уровень доступен в премиум-версии
              </p>
            </div>
          </div>
        )}
        {/* Модальное окно выбора после среднего уровня */}
        {showMediumChoiceDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 text-center shadow-2xl">
              <div className="text-5xl mb-4">🔥</div>
              <h2 className="text-2xl font-bold mb-2">Глубокое понимание!</h2>
              <p className="text-gray-600 mb-6">
                Ты отлично углубился в тему коэффициентов!
                <br />
                <br />
                <span className="font-semibold">Как хочешь продолжить?</span>
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowMediumChoiceDialog(false);
                    router.push(`/math/algebra/kvadratnye-uravneniya/${lessonId}?difficulty=hard`);
                  }}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  💪 Стать магистром этой темы (+30 XP, Premium)
                </button>

                <button
                  onClick={() => {
                    setShowMediumChoiceDialog(false);
                    router.push(
                      `/math/algebra/kvadratnye-uravneniya/${lessonId + 1}?difficulty=light`,
                    );
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  📚 Перейти к следующему уроку
                </button>

                <button
                  onClick={() => {
                    setShowMediumChoiceDialog(false);
                    router.push('/');
                  }}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all">
                  → На главную
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Сложный уровень доступен в премиум-версии
              </p>
            </div>
          </div>
        )}
        {/* Модальное окно выбора после hard уровня */}
        {showHardChoiceDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 text-center shadow-2xl">
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold mb-2">Мастер коэффициентов!</h2>
              <p className="text-gray-600 mb-6">
                Ты освоил тему на уровне магистра!
                <br />
                Готов к новым вызовам?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowHardChoiceDialog(false);
                    router.push(
                      `/math/algebra/kvadratnye-uravneniya/${lessonId + 1}?difficulty=light`,
                    );
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl">
                  📚 Следующий урок
                </button>

                <button
                  onClick={() => {
                    setShowHardChoiceDialog(false);
                    router.push('/');
                  }}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl">
                  → На главную
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Модальное окно выбора уровня после теории */}
        {theoryCompleted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 text-center shadow-2xl">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-2">Теперь к практике!</h2>
              <p className="text-gray-600 mb-4">Ты освоил теорию. Выбери уровень сложности:</p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setTheoryCompleted(false);
                    router.push(`/math/algebra/kvadratnye-uravneniya/${lessonId}?difficulty=light`);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all">
                  🌱 Лёгкий (3 жизни, базовые задания)
                </button>

                <button
                  onClick={() => {
                    setTheoryCompleted(false);
                    router.push(
                      `/math/algebra/kvadratnye-uravneniya/${lessonId}?difficulty=medium`,
                    );
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all">
                  🔥 Средний (2 жизни, углублённые задания)
                </button>

                <button
                  onClick={() => {
                    setTheoryCompleted(false);
                    router.push(`/math/algebra/kvadratnye-uravneniya/${lessonId}?difficulty=hard`);
                  }}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-all">
                  💪 Сложный (1 жизнь, Premium)
                </button>

                <p className="text-xs text-gray-400 mt-2">
                  💡 Совет: начни с лёгкого, если не уверен в своих силах!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
