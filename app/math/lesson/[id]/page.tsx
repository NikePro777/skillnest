import { lessons } from './lessonsData';
import LessonClient from './lessonClient';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = Number(id);
  const lesson = lessons[lessonId];

  if (!lesson) {
    return <div className="p-8 text-center">Урок не найден</div>;
  }

  return <LessonClient lesson={lesson} lessonId={lessonId} />;
}
