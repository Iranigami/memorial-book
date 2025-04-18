import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultsPage";
import PersonPage from "./pages/PersonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/results" element={<SearchResultPage />} />
        <Route path="/person/:personId" element={<PersonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
