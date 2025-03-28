import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; // Make sure this file exists

const App = () => {
  return (
    <div className="App bg-[#000080] min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
