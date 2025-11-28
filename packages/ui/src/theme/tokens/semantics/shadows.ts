export type ShadowDefinition = {
  offsetY: number;
  blur: number;
  opacity: number;
  elevation: number;
};

export const semanticShadows = {
  none: { offsetY: 0, blur: 0, opacity: 0, elevation: 0 },
  sm: { offsetY: 1, blur: 2, opacity: 0.08, elevation: 2 },
  md: { offsetY: 2, blur: 4, opacity: 0.12, elevation: 4 },
  lg: { offsetY: 4, blur: 8, opacity: 0.16, elevation: 8 },
  xl: { offsetY: 8, blur: 16, opacity: 0.2, elevation: 16 },
} as const;

export type SemanticShadows = typeof semanticShadows;
export type ShadowKey = keyof SemanticShadows;
