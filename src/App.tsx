import { MemoryRouter, Route, Routes } from "react-router";

import { Header } from "./components/Header";
import { ROUTES, type RoutePath } from "./navigation";
import { About } from "./screens/About";
import { Game } from "./screens/Game";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";

type AppProps = {
  initialScreen?: RoutePath;
};

export const App = ({ initialScreen = ROUTES.home }: AppProps) => {
  return (
    <>
      <Header />
      <MemoryRouter initialEntries={[initialScreen]}>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.settings} element={<Settings />} />
          <Route path={ROUTES.game} element={<Game />} />
          <Route path={ROUTES.about} element={<About />} />
        </Routes>
      </MemoryRouter>
    </>
  );
};
