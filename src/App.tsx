import { useRef, useState } from "react";
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
  const id = useRef(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/result" element={<SearchResultPage />} />
        <Route path="/person/:personId" element={<PersonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
