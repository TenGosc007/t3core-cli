import { Text, useWindowSize } from "ink";

import { getAppVersion } from "@/utils/appInfo";

import { layoutStyles } from "./layoutStyles";

const appVersion = getAppVersion();

export const BottomLayout = () => {
  const { columns } = useWindowSize();
  const count = columns - appVersion.length - 6;

  return (
    <Text color={layoutStyles.color} backgroundColor={layoutStyles.background}>
      ╰{"─".repeat(count)}{" "}
      <Text dimColor color="white">
        v{appVersion}
      </Text>{" "}
      ─╯
    </Text>
  );
};
