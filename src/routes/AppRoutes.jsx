// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ComponentsGallery from "../pages/ComponentsGallery/ComponentsGallery";
import CSSSnippets from "../pages/CSSSnippets/CSSSnippets";
import UIBlocksLibrary from "../pages/UIBlocksLibrary/UIBlocksLibrary";
import EffectsLab from "../pages/EffectsLab/EffectsLab";
import ColorUtilities from "../pages/ColorUtilities/ColorUtilities";
import About from "../pages/About/About";
import Contribute from "../pages/Contribute/Contribute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components" element={<ComponentsGallery />} />
      <Route path="/snippets" element={<CSSSnippets />} />
      <Route path="/templates" element={<UIBlocksLibrary />} />
      <Route path="/effects" element={<EffectsLab />} />
      <Route path="/colors" element={<ColorUtilities />} />
      <Route path="/about" element={<About />} />
      <Route path="/contribute" element={<Contribute />} />
    </Routes>
  );
};

export default AppRoutes;
