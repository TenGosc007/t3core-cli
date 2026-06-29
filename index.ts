#!/usr/bin/env node
import { render } from "ink";
import React from "react";

import { App } from "./src/App";
import { useSettingsStore } from "./src/services/settings";
import { getCliFlags, getInitialScreen } from "./src/utils/cli";

useSettingsStore.getState().load();

const flags = getCliFlags();
if (flags.sound !== undefined) {
  useSettingsStore.setState({ beep: flags.sound });
}
if (flags.mobile) {
  useSettingsStore.setState({ arrowKeyNavigation: false });
} else if (flags.arrowKey !== undefined) {
  useSettingsStore.setState({ arrowKeyNavigation: flags.arrowKey });
}

console.clear();

render(React.createElement(App, { initialScreen: getInitialScreen() }));
