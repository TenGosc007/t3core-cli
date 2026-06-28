import { MemoryRouter, Route, Routes } from "react-router";

import { ROUTES } from "./navigation";
import { About } from "./screens/About";
import { Game } from "./screens/Game";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";

export const App = () => {
  return (
    <MemoryRouter initialEntries={[ROUTES.home]}>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.settings} element={<Settings />} />
        <Route path={ROUTES.game} element={<Game />} />
        <Route path={ROUTES.about} element={<About />} />
      </Routes>
    </MemoryRouter>
  );
};
