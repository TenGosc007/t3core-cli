#!/usr/bin/env node
import { render } from "ink";
import React from "react";

import { App } from "./src/App";
import { appInit } from "./src/utils/appInit";
import { getInitialScreen } from "./src/utils/cli";

appInit();
console.clear();

render(React.createElement(App, { initialScreen: getInitialScreen() }));
