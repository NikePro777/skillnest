import { notFound } from 'next/navigation';
import { getLesson } from '../../kvadratnye-uravneniya/data/index';
import LessonClient from './LessonClient';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ difficulty?: string }>;
};

export default async function LessonPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { difficulty = 'light' } = await searchParams;

  const lessonId = parseInt(id);
  const lesson = getLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  // Временно всем даём премиум-доступ
  const hasPremiumAccess = true;

  return (
    <LessonClient
      lesson={lesson}
      lessonId={lessonId}
      difficultyId={difficulty as 'light' | 'medium' | 'hard'}
      hasPremiumAccess={hasPremiumAccess}
    />
  );
}
