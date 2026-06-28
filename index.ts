#!/usr/bin/env node
import { render } from "ink";
import React from "react";

import { App } from "./src/App";
import { useSettingsStore } from "./src/services/settings";
import { getInitialScreen } from "./src/utils/cli";

useSettingsStore.getState().load();

console.clear();

render(React.createElement(App, { initialScreen: getInitialScreen() }));
