import meow from "meow";

import { ROUTES, type RoutePath } from "@/navigation";

export type CliFlags = {
  sound: boolean | undefined;
  arrowNav: boolean | undefined;
  showHistory: boolean | undefined;
  mobile: boolean | undefined;
};

type MeowType = {
  screen: { type: "string"; default: keyof typeof ROUTES };
  sound: { type: "boolean"; default: boolean };
  arrowNav: { type: "boolean"; default: boolean };
  showHistory: { type: "boolean"; default: boolean };
  mobile: { type: "boolean"; default: boolean };
};

const cli = meow<MeowType>(
  `
  Usage
    $ t3core-cli

  Options
    --screen     Initial screen to show (home, settings, game, about)
    --sound      Enable or disable sound (true/false)
    --arrowNav   Enable or disable arrow key navigation (true/false)
    --showHistory Enable or disable game history display (true/false)
    --mobile     Mobile mode — disables arrow key navigation

  Examples
    $ t3core-cli --screen=settings
    $ t3core-cli --sound=false --arrowNav=false --showHistory=true
    $ t3core-cli --mobile
`,
  {
    importMeta: import.meta,
    flags: {
      screen: {
        type: "string",
        default: "home",
      },
      sound: {
        type: "boolean",
        default: true,
      },
      arrowNav: {
        type: "boolean",
        default: true,
      },
      showHistory: {
        type: "boolean",
        default: false,
      },
      mobile: {
        type: "boolean",
        default: false,
      },
    },
  },
);

const getCli = () => ({
  initialScreen:
    ROUTES[cli.flags.screen.toLowerCase() as keyof typeof ROUTES] ??
    ROUTES.home,
  flags: cli.flags,
  showHelp: () => cli.showHelp(),
});

export const getInitialScreen = (): RoutePath => getCli().initialScreen;

export const getCliFlags = (): CliFlags => ({
  sound: cli.flags.sound,
  arrowNav: cli.flags.arrowNav,
  showHistory: cli.flags.showHistory,
  mobile: cli.flags.mobile,
});
