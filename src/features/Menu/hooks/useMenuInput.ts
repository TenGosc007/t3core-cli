import { useApp, useInput } from "ink";
import { useState } from "react";

import { useNavigate } from "@/navigation";

import { MENU_OPTIONS } from "../constants/menuOptions";

export const useMenuInput = () => {
  const { exit } = useApp();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(
        (prev) => (prev - 1 + MENU_OPTIONS.length) % MENU_OPTIONS.length,
      );
    }

    if (key.downArrow) {
      setSelectedIndex((prev) => (prev + 1) % MENU_OPTIONS.length);
    }

    if (key.return) {
      const option = MENU_OPTIONS[selectedIndex];
      if (option.route === null) {
        exit();
      } else {
        navigate(option.route);
      }
    }
  });

  return {
    selectedIndex,
  };
};
