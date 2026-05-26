// components/common/TheoryTypes.ts

export type CoefficientInfo = {
  description: string;
  note?: string;
};

export type Coefficients = {
  a: CoefficientInfo;
  b: CoefficientInfo;
  c: CoefficientInfo;
};

export type Example = {
  formula: string;
  a: number | string;
  b: number | string;
  c: number | string;
};

export type Formula = {
  latex: string;
  highlight?: ('a' | 'b' | 'c')[];
};

export type TheoryContent = {
  title?: string;
  description?: string;
  formula?: Formula;
  coefficients?: Coefficients;
  examples?: Example[];
  warning?: string;
};
