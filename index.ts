#!/usr/bin/env node
import { render } from "ink";
import { createElement } from "react";

import { App } from "./src/App";
import { appInit } from "./src/utils/appInit";
import { getInitialScreen } from "./src/utils/cli";

appInit();
console.clear();

render(createElement(App, { initialScreen: getInitialScreen() }));
