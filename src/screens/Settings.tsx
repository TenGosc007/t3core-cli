import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SETTINGS_OPTIONS } from "@/features/Settings/constants/settingsOptions";
import { useSettingsToggleOption } from "@/features/Settings/hooks/useSettingsToggleOption";
import { useGoBack } from "@/hooks/useGoBack";

import { SettingsView } from "../features/Settings/Settings";

export const Settings = () => {
  useGoBack();

  const { toggleOption } = useSettingsToggleOption();

  const handleOptionSelect = (value: string) => {
    if (isNaN(+value)) return;
    toggleOption(+value - 1);
  };

  return (
    <>
      <Container>
        <Header label="Settings" />
        <SettingsView />
      </Container>

      <Footer
        onSubmit={handleOptionSelect}
        hints={[
          `Type 1-${SETTINGS_OPTIONS.length} to toggle`,
          "esc Back to Menu",
        ]}
        arrowNavHints={["↑↓ Navigate", "Enter Toggle", "esc Back to Menu"]}
      />
    </>
  );
};
