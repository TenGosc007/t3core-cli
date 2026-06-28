import meow from "meow";

import { ROUTES, type RoutePath } from "@/navigation";

const cli = meow<{
  screen: {
    type: "string";
    default: keyof typeof ROUTES;
  };
}>(
  `
  Usage
    $ t3core-cli

  Options
    --screen  Initial screen to show (home, settings, game, about)

  Examples
    $ t3core-cli --screen=settings
`,
  {
    importMeta: import.meta,
    flags: {
      screen: {
        type: "string",
        default: "home",
      },
    },
  },
);

const getCli = () => ({
  initialScreen: ROUTES[cli.flags.screen as keyof typeof ROUTES] ?? ROUTES.home,
  flags: cli.flags,
  showHelp: () => cli.showHelp(),
});

export const getInitialScreen = (): RoutePath => getCli().initialScreen;
