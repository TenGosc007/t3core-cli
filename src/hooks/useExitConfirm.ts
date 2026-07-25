import { useApp, useInput } from "ink";
import { useLocation } from "react-router";

import { ROUTES } from "@/navigation";
import { useExitAppStore } from "@/services/app";

export const useExitConfirm = () => {
  const { exit } = useApp();
  const confirming = useExitAppStore((state) => state.confirming);
  const setConfirming = useExitAppStore((state) => state.setConfirming);
  const location = useLocation();
  const isHome = location.pathname === ROUTES.home;

  useInput((input) => {
    if (input === "q" && isHome) {
      setConfirming(true);
    }

    if (!confirming) return;

    if (input === "y") {
      exit();
    }

    if (input === "n") {
      setConfirming(false);
    }
  });

  return { confirming };
};
