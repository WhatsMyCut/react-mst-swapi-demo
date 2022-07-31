import { Routes, Route } from "react-router-dom";
import { Dashboard, PlanetList } from "../views";
export const Router = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/planets" element={<PlanetList />} />
    </Routes>
  )
}

export default Router;