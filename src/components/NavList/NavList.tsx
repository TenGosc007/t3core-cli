import type { ListProps } from "../List";

import { Box } from "ink";

import { List } from "../List";
import { NavListIndicator } from "./NavListIndicator";

type Props<T> = ListProps<T> & {
  arrowNav?: boolean;
  selectedIndex?: number;
  color?: string;
  keyExtractor?: (item: T, index: number) => string | number;
};

export const NavList = <T,>({
  arrowNav = false,
  selectedIndex = 0,
  color,
  keyExtractor,
  ...props
}: Props<T>) => {
  const handleRenderItem = (item: T, index: number) => {
    return (
      <Box key={keyExtractor?.(item, index) ?? index} gap={1}>
        <NavListIndicator
          arrowNav={arrowNav}
          selected={selectedIndex === index}
          number={index + 1}
          color={color}
        />
        {props.renderItem(item, index)}
      </Box>
    );
  };

  return (
    <List style={props.style} data={props.data} renderItem={handleRenderItem} />
  );
};
