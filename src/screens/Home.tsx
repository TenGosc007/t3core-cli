import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Menu } from "@/features/Menu";
import {
  MENU_OPTIONS,
  menuInputSchema,
} from "@/features/Menu/constants/menuOptions";
import { useMenuNavigation } from "@/features/Menu/hooks/navigateToMenuOption";

export const Home = () => {
  const navigateToMenuOption = useMenuNavigation();

  const handleOptionSelect = (value: string) => {
    if (isNaN(+value)) return;
    navigateToMenuOption(+value - 1);
  };

  return (
    <>
      <Container>
        <Menu />
      </Container>

      <Footer
        onSubmit={handleOptionSelect}
        hints={[`Type 1-${MENU_OPTIONS.length} to select`, `q Quit`]}
        arrowNavHints={["↑↓ Navigate", "Enter Select"]}
        validationSchema={menuInputSchema}
      />
    </>
  );
};
