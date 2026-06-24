import type { AppRoute } from "@/navigation/routes";

import { MENU_ITEMS } from "@/features/menu/constants/menuItems";
import { waitForInput } from "@/services/inputService";
import { s } from "@/utils/styledLabel";

const MENU_ITEM_IDS_LABEL = MENU_ITEMS.map(({ id }) => id).join("-");

const getMenuItemById = (id: string | null) => {
  return MENU_ITEMS.find((item) => item.id === id?.trim()) ?? null;
};

export const MenuEntry = async (): Promise<AppRoute> => {
  while (true) {
    console.log("\t");
    const answer = await waitForInput(
      `Enter your choice (${MENU_ITEM_IDS_LABEL}): `,
    );
    const menuItem = getMenuItemById(answer);

    if (menuItem) return menuItem.route;

    console.log(
      s.red(`Invalid choice. Select one of: ${MENU_ITEM_IDS_LABEL}.`),
    );
  }
};
