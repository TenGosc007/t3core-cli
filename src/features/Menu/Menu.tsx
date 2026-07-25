import { MenuList } from "./components/MenuList";
import { useMenuInput } from "./hooks/useMenuInput";

export const Menu = () => {
  const { selectedIndex, arrowNav } = useMenuInput();

  return <MenuList selectedIndex={selectedIndex} arrowNav={arrowNav} />;
};
