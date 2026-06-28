import type { RoutePath } from "./types";

// eslint-disable-next-line no-restricted-imports
import { useNavigate as useNavigateOriginal } from "react-router";

export const useNavigate = () => {
  const navigate = useNavigateOriginal();

  const typedNavigate = (path: RoutePath) => {
    void navigate(path);
  };

  return typedNavigate;
};
