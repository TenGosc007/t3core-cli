import { useApp, useInput } from "ink";
import { useLocation } from "react-router";

import { ROUTES } from "@/navigation";
import { useExitAppStore } from "@/services/app";

import { handleExitInput } from "./handleExitInput";

export const useExitConfirm = () => {
  const { exit } = useApp();
  const confirming = useExitAppStore((state) => state.confirming);
  const setConfirming = useExitAppStore((state) => state.setConfirming);
  const location = useLocation();
  const isHome = location.pathname === ROUTES.home;

  useInput((input) => {
    const result = handleExitInput(input, isHome, confirming);
    if (result.type === "startConfirm") setConfirming(true);
    else if (result.type === "exit") exit();
    else if (result.type === "cancel") setConfirming(false);
  });

  return { confirming };
};
