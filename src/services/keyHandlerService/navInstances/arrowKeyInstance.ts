import type { KeyHandlerOptions } from "@/services/keyHandlerService";

import { KeyHandler } from "@/services/keyHandlerService";

let handler: KeyHandler | null = null;

const getArrowKeyNav = () => {
  if (handler == null || !handler.running) return null;
  return handler;
};

const setArrowKeyNav = (options: KeyHandlerOptions) => {
  if (handler?.running) handler.stop();

  handler = new KeyHandler(options);
  handler.start();
  return handler;
};

const clearArrowKeyNav = () => {
  if (handler == null) return;

  handler.stop();
  handler = null;
};

export const ArrowKeyInstance = {
  get: getArrowKeyNav,
  set: setArrowKeyNav,
  clear: clearArrowKeyNav,
};
