import { Container } from "@/components/Container";
import { useGoBack } from "@/hooks/useGoBack";

import { SettingsView } from "../features/Settings/Settings";

export const Settings = () => {
  useGoBack();

  return (
    <Container>
      <SettingsView />
    </Container>
  );
};
