import type { KeyHandler } from "@/components/KeyHandler/KeyHandler";

let handler: KeyHandler | null = null;

const getArrowKeyNav = () => {
  if (handler == null || !handler.running) return null;
  return handler;
};

const setArrowKeyNav = (newHandler: KeyHandler) => {
  handler = newHandler;
  handler.start();
  return handler;
};

const clearArrowKeyNav = () => {
  if (handler == null) return;

  handler.stop();
  handler = null;
};

export const ArrowKeyNavInstance = {
  get: getArrowKeyNav,
  set: setArrowKeyNav,
  clear: clearArrowKeyNav,
};
