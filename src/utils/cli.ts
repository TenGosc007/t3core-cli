import meow from "meow";

import { ROUTES, type RoutePath } from "@/navigation";

export type CliFlags = {
  sound: boolean | undefined;
  arrowKey: boolean | undefined;
  mobile: boolean | undefined;
};

const cli = meow<{
  screen: {
    type: "string";
    default: keyof typeof ROUTES;
  };
  sound: {
    type: "boolean";
  };
  arrowKey: {
    type: "boolean";
  };
  mobile: {
    type: "boolean";
  };
}>(
  `
  Usage
    $ t3core-cli

  Options
    --screen     Initial screen to show (home, settings, game, about)
    --sound      Enable or disable sound (true/false)
    --arrowKey   Enable or disable arrow key navigation (true/false)
    --mobile     Mobile mode — disables arrow key navigation

  Examples
    $ t3core-cli --screen=settings
    $ t3core-cli --sound=false --arrowKey=false
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
      },
      arrowKey: {
        type: "boolean",
      },
      mobile: {
        type: "boolean",
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
  arrowKey: cli.flags.arrowKey,
  mobile: cli.flags.mobile,
});
