'use client';

import { ReactNode } from 'react';
import { TheoryContent } from './TheoryTypes';

type TheoryBlockProps = {
  content: TheoryContent | string; // может быть строка (старый формат) или объект
  children?: ReactNode;
};

export default function TheoryBlock({ content, children }: TheoryBlockProps) {
  // Если content — это строка (старый формат)
  if (typeof content === 'string') {
    return (
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📖</span>
          <span className="font-semibold text-blue-800">Новое понятие</span>
        </div>
        <div className="prose prose-blue max-w-none">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        {children}
      </div>
    );
  }

  // Новый формат — объект TheoryContent
  return (
    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📖</span>
        <span className="font-semibold text-blue-800">Новое понятие</span>
      </div>

      <div className="space-y-4">
        {content.title && <h3 className="text-xl font-bold text-gray-800">{content.title}</h3>}

        {content.description && <p className="text-gray-700">{content.description}</p>}

        {content.formula && (
          <div className="text-2xl font-mono text-center py-3 bg-white rounded-lg">
            {content.formula.latex}
            {content.formula.highlight && (
              <span className="text-sm text-gray-500 ml-2">
                (выделено: {content.formula.highlight.join(', ')})
              </span>
            )}
          </div>
        )}

        {content.coefficients && (
          <div className="grid gap-3 mt-4">
            {Object.entries(content.coefficients).map(([letter, info]) => (
              <div key={letter} className="bg-white rounded-lg p-3 border border-gray-200">
                <span className="font-bold text-lg">{letter}</span> — {info.description}
                {info.note && <p className="text-gray-500 text-sm mt-1 italic">{info.note}</p>}
              </div>
            ))}
          </div>
        )}

        {content.examples &&
          content.examples.map((example, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-medium text-gray-700 mb-2">📐 Пример:</p>
              <div className="font-mono text-lg text-center mb-3">{example.formula}</div>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-blue-600">a = {example.a}</span>
                <span className="text-green-600">b = {example.b}</span>
                <span className="text-purple-600">c = {example.c}</span>
              </div>
            </div>
          ))}

        {content.warning && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">⚠️ {content.warning}</p>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
