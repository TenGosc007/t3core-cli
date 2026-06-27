import { settingsManager } from "@/services/settings";

const fgCodes = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  blackBright: 90,
  gray: 90,
  grey: 90,
  redBright: 91,
  lightRed: 91,
  greenBright: 92,
  lightGreen: 92,
  yellowBright: 93,
  lightYellow: 93,
  blueBright: 94,
  lightBlue: 94,
  magentaBright: 95,
  lightMagenta: 95,
  cyanBright: 96,
  lightCyan: 96,
  whiteBright: 97,
  lightWhite: 97,
} as const;

const bgCodes = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
  bgBlackBright: 100,
  bgGray: 100,
  bgGrey: 100,
  bgRedBright: 101,
  bgGreenBright: 102,
  bgYellowBright: 103,
  bgBlueBright: 104,
  bgMagentaBright: 105,
  bgCyanBright: 106,
  bgWhiteBright: 107,
} as const;

const modifierCodes = {
  reset: 0,
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  inverse: 7,
  hidden: 8,
  strikethrough: 9,
} as const;

type FgColor = keyof typeof fgCodes;
type BgColor = keyof typeof bgCodes;
type Modifier = keyof typeof modifierCodes;

type Callable = (...args: (string | number)[]) => string;

type AfterFgBg = {
  [K in Modifier]: AfterFgBg & Callable;
} & Callable;

type AfterFg = {
  [K in BgColor]: AfterFgBg & Callable;
} & {
  [K in Modifier]: AfterFg & Callable;
} & Callable;

type AfterBg = {
  [K in FgColor]: AfterFgBg & Callable;
} & {
  [K in Modifier]: AfterBg & Callable;
} & Callable;

type Styler = {
  [K in FgColor]: AfterFg & Callable;
} & {
  [K in BgColor]: AfterBg & Callable;
} & {
  [K in Modifier]: Styler & Callable;
} & Callable;

const allCodes: Record<string, number> = {
  ...fgCodes,
  ...bgCodes,
  ...modifierCodes,
};

const allKeys = new Set(Object.keys(allCodes));

function getStyleKey(prop: string, codes: number[]): Styler | undefined {
  if (!allKeys.has(prop)) return undefined;
  return buildStyler([...codes, allCodes[prop]]);
}

function buildStyler(codes: number[]): Styler {
  const apply = (...args: (string | number)[]): string => {
    const settings = settingsManager.getRuntimeSettings();
    const text = args.join(" ");

    if (!settings.style) return text;
    if (codes.length === 0) return text;

    return `\x1b[${codes.join(";")}m${text}\x1b[0m`;
  };

  return new Proxy(apply, {
    get(_target, prop: string) {
      return getStyleKey(prop, codes);
    },
  }) as unknown as Styler;
}

export const s: Styler = new Proxy(
  ((...args: (string | number)[]) => args.join(" ")) as Styler,
  {
    get(_target, prop: string) {
      return getStyleKey(prop, []);
    },
  },
);
