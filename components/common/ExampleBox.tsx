export default function ExampleBox({
  formula,
  a,
  b,
  c,
}: {
  formula: string;
  a: number | string;
  b: number | string;
  c: number | string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <p className="font-medium text-gray-700 mb-2">📐 Пример:</p>
      <div className="font-mono text-lg text-center mb-3">{formula}</div>
      <div className="flex justify-center gap-4 text-sm">
        <span className="text-blue-600">a = {a}</span>
        <span className="text-green-600">b = {b}</span>
        <span className="text-purple-600">c = {c}</span>
      </div>
    </div>
  );
}
