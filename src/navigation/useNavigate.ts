import type { RoutePath } from "./types";

// eslint-disable-next-line no-restricted-imports
import { useNavigate as useNavigateOriginal } from "react-router";

import { beep } from "@/services/settings";

export const useNavigate = () => {
  const navigate = useNavigateOriginal();

  const typedNavigate = (path: RoutePath) => {
    beep();
    void navigate(path);
  };

  return typedNavigate;
};
