import logo from "./logo.svg";
import React from "react";
import StartPage from "./pages/startPage";
import SimResPage from "./pages/SimResPage";
import SimilarPage from "./pages/similarPage";
import SymPage from "./pages/SymPage";
import SymResPage from "./pages/SymResPage";
import MatchPage from "./pages/matchPage";
import MatchResPage from "./pages/MatchResPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/simResult" element={<SimResPage />} />
          <Route path="/similar" element={<SimilarPage />} />
          <Route path="/symResult" element={<SymResPage />} />
          <Route path="/symmetry" element={<SymPage />} />
          <Route path="/matchResult" element={<MatchResPage />} />
          <Route path="/match" element={<MatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
