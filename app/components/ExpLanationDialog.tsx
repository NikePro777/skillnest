// app/components/ExplanationDialog.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

type ExplanationDialogProps = {
  open: boolean;
  onClose: () => void;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  hint?: string;
  detailedExplanation?: string;
  onRetry?: () => void;
};

export default function ExplanationDialog({
  open,
  onClose,
  isCorrect,
  userAnswer,
  correctAnswer,
  hint,
  detailedExplanation,
  onRetry,
}: ExplanationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={isCorrect ? 'text-green-600' : 'text-red-600'}>
            {isCorrect ? '✅ Правильно!' : '❌ Неправильно'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!isCorrect && (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="font-medium text-red-800">Твой ответ: {userAnswer}</p>
              <p className="text-red-700">Правильный ответ: {correctAnswer}</p>
            </div>
          )}

          {detailedExplanation ? (
            <div className="bg-blue-50 p-4 rounded-lg whitespace-pre-wrap">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-blue-800">{detailedExplanation}</p>
              </div>
            </div>
          ) : (
            hint && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800">💡 {hint}</p>
              </div>
            )
          )}

          <div className="flex gap-3">
            {!isCorrect && onRetry && (
              <Button onClick={onRetry} variant="outline" className="flex-1">
                Попробовать ещё
              </Button>
            )}
            <Button onClick={onClose} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              {isCorrect ? 'Продолжить' : 'Понятно'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
