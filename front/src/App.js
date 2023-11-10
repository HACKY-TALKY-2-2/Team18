import logo from "./logo.svg";
import React from "react";
import StartPage from "./pages/startPage";
import SimResPage from './pages/SimResPage';
import SimilarPage from "./pages/similarPage";
import SymPage from "./pages/SymPage";
import MatchPage from "./pages/matchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/result" element={<SimResPage />} />
          <Route path="/similar" element={<SimilarPage />} />
          <Route path="/symmetry" element={<SymPage />} />
          <Route path="/match" element={<MatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
