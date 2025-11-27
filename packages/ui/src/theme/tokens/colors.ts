export const primitiveColors = {
  // 1. The Core (High Contrast)
  white: '#FFFFFF',
  black: '#000000',

  // 2. The Grays (Uber-like "Move" Grays)
  // Used for inputs, borders, and subtle backgrounds
  gray50: '#F3F3F3', // Common Uber background/input fill
  gray100: '#E8E8E8',
  gray200: '#E2E2E2',
  gray300: '#CBCBCB',
  gray400: '#AFAFAF',
  gray500: '#757575',
  gray600: '#5E5E5E',
  gray700: '#333333',
  gray800: '#1F1F1F', // Dark mode surfaces
  gray900: '#141414', // Almost black

  // 3. Safety Blue (The "Brand" Color)
  // Used for: "You are here" dots, Links, Safety Shield, Selected States
  blue50: '#F0F4FF',
  blue100: '#D0D9F4',
  blue200: '#A3B7ED',
  blue300: '#7694E6',
  blue400: '#4A72DF',
  blue500: '#276EF1', // ⚠️ The Uber Blue
  blue600: '#1F58C1',
  blue700: '#174291',
  blue800: '#102C61',
  blue900: '#081630',

  // 4. Success (Darker than Material for visibility)
  success50: '#EBF7EE',
  success100: '#CEEAD4',
  success200: '#AEE1B8',
  success300: '#8CD89B',
  success400: '#6BCF7E',
  success500: '#05A357', // Deeper green
  success600: '#0D8345',
  success700: '#036435',
  success800: '#024424',
  success900: '#012413',

  // 5. Warning (Amber/Brownish for contrast)
  warning50: '#FFF8E1',
  warning100: '#FFECB3',
  warning200: '#FFE082',
  warning300: '#FFD54F',
  warning400: '#FFCA28',
  warning500: '#FFC043', // Uber's Taxi Yellow
  warning600: '#FFB300',
  warning700: '#F57F02',
  warning800: '#E65100',
  warning900: '#BF360C',

  // 6. Danger (Sharper Red)
  danger50: '#FEF2F2',
  danger100: '#FDECEC',
  danger200: '#F9CFCE',
  danger300: '#F4AFA7',
  danger400: '#EE8F86',
  danger500: '#DE1035', // Uber Red (High urgency)
  danger600: '#BC1500',
  danger700: '#961100',
  danger800: '#710D00',
  danger900: '#4B0800',

  // Star/rating gold (distinct from warning)
  rating500: '#FFB800',
} as const;

export type PrimitiveColors = typeof primitiveColors;
