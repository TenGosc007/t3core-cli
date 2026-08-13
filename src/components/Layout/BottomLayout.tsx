import { Text, useWindowSize } from "ink";

import { getAppVersion } from "@/utils/appInfo";

import { layoutStyles } from "./layoutStyles";

const appVersion = getAppVersion();

export const BottomLayout = () => {
  const { columns } = useWindowSize();
  const count = columns - appVersion.length - 4;

  return (
    <Text color={layoutStyles.color} backgroundColor={layoutStyles.background}>
      ╰{"─".repeat(Math.floor(count * 0.98))}
      <Text dimColor color="white">
        {` v${appVersion} `}
      </Text>
      {"─".repeat(Math.floor(count * 0.02))}╯
    </Text>
  );
};
