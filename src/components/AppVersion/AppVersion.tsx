import { Text } from "ink";

import packageJson from "package.json";

export const AppVersion = () => {
  return <Text dimColor>v{packageJson.version}</Text>;
};
