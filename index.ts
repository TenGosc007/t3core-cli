#!/usr/bin/env node
import { render } from "ink";
import React from "react";

import { App } from "./src/App";
import { getInitialScreen } from "./src/utils/cli";

console.clear();

render(React.createElement(App, { initialScreen: getInitialScreen() }));
