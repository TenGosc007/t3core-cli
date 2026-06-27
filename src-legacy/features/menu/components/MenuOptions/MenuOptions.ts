import { MENU_ITEMS } from "@/features/menu/constants/menuItems";
import { s } from "@/utils/styledLabel";

export const MenuOptions = () => {
  MENU_ITEMS.forEach((item) => {
    const itemNumber = s.yellowBright.bold(item.id);
    const itemLabel = s.blueBright(item.label);

    console.log(`[${itemNumber}] ${itemLabel}`);
  });
};
