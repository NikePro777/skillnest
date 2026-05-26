import { Coefficients } from '@/components/common/TheoryTypes';

type CoefficientListProps = {
  coefficients: Coefficients;
};

export default function CoefficientList({ coefficients }: CoefficientListProps) {
  return (
    <div className="grid gap-3 mt-4">
      {Object.entries(coefficients).map(([letter, info]) => (
        <div key={letter} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-bold ${
                letter === 'a'
                  ? 'text-blue-600'
                  : letter === 'b'
                    ? 'text-green-600'
                    : 'text-purple-600'
              }`}>
              {letter}
            </span>
            <span className="font-medium text-gray-800">{info.description}</span>
          </div>
          {info.note && <p className="text-gray-500 text-sm mt-1 italic">{info.note}</p>}
        </div>
      ))}
    </div>
  );
}
