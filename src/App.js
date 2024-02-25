import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Manga from "./pages/Manga";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga" element={<Manga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
