import logo from "./logo.svg";
import React from "react";
import StartPage from "./pages/startPage";
import SimilarPage from "./pages/similarPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/similar" element={<SimilarPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
