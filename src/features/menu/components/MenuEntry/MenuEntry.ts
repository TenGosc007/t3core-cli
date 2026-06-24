import { MENU_ITEMS } from "@/features/menu/constants/menuItems";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { waitForInput } from "@/services/inputService";

const MENU_ITEM_IDS_LABEL = `${MENU_ITEMS[0].id}-${MENU_ITEMS[MENU_ITEMS.length - 1].id}`;

const getMenuItemById = (id: string | null) => {
  return MENU_ITEMS.find((item) => item.id === id?.trim()) ?? null;
};

export const MenuEntry = async (): Promise<AppRoute> => {
  console.log("\t");
  const answer = await waitForInput(
    `Enter your choice (${MENU_ITEM_IDS_LABEL}): `,
  );

  const menuItem = getMenuItemById(answer);
  if (menuItem) return menuItem.route;

  return ROUTES.MENU;
};
