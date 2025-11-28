import { palette } from '../primitives/colors';

export const createSemanticColors = (mode: 'light' | 'dark') => {
  const isLight = mode === 'light';

  return {
    background: {
      primary: isLight ? palette.white : palette.neutral900,
      secondary: isLight ? palette.neutral50 : palette.neutral800,
      tertiary: isLight ? palette.neutral100 : palette.neutral700,
      inverse: isLight ? palette.neutral900 : palette.white,
      overlay: palette.blackAlpha70,
    },
    surface: {
      default: isLight ? palette.white : palette.neutral800,
      raised: isLight ? palette.white : palette.neutral700,
      sunken: isLight ? palette.neutral50 : palette.neutral900,
    },
    text: {
      primary: isLight ? palette.neutral900 : palette.white,
      secondary: isLight ? palette.neutral600 : palette.neutral400,
      tertiary: isLight ? palette.neutral500 : palette.neutral500,
      disabled: isLight ? palette.neutral400 : palette.neutral600,
      inverse: isLight ? palette.white : palette.neutral900,
      link: palette.blue500,
      error: palette.danger500,
    },
    border: {
      default: isLight ? palette.neutral200 : palette.neutral700,
      subtle: isLight ? palette.neutral100 : palette.neutral800,
      strong: isLight ? palette.neutral300 : palette.neutral600,
      focus: palette.blue500,
    },
    status: {
      success: palette.success500,
      successBg: isLight ? palette.success50 : palette.success900,
      warning: palette.warning500,
      warningBg: isLight ? palette.warning50 : palette.warning900,
      error: palette.danger500,
      errorBg: isLight ? palette.danger50 : palette.danger900,
      info: palette.blue500,
      infoBg: isLight ? palette.blue50 : palette.blue900,
    },
    interactive: {
      primary: palette.blue500,
      primaryHover: palette.blue600,
      primaryPressed: palette.blue700,
      secondary: isLight ? palette.neutral100 : palette.neutral700,
      secondaryHover: isLight ? palette.neutral200 : palette.neutral600,
      secondaryPressed: isLight ? palette.neutral300 : palette.neutral500,

      ghost: palette.transparent,
      ghostPressed: isLight ? palette.blackAlpha10 : palette.whiteAlpha10,
    },
    palette,
  } as const;
};

export type SemanticColors = ReturnType<typeof createSemanticColors>;
