export default function FormulaWithHighlight({
  latex,
  highlight = [],
  className = '',
}: {
  latex: string;
  highlight?: ('a' | 'b' | 'c')[];
  className?: string;
}) {
  return (
    <div className={`text-2xl font-mono text-center ${className}`}>
      {latex}
      {highlight.length > 0 && (
        <span className="text-sm text-gray-500 ml-2">(подсветка: {highlight.join(', ')})</span>
      )}
    </div>
  );
}
