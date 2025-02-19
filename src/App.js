import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TrucksList from "./components/TrucksList";
import TruckDetails from "./components/TruckDetails";
import MainPage from "./components/MainPage";
import HistoryPage from "./components/HistoryPage";
import { fetchTrucks } from "./api"; // Импорт API-запроса

function App() {
  const [trucks, setTrucks] = useState([]);

  // Загрузка данных с бэкенда при старте
  useEffect(() => {
    fetchTrucks().then(setTrucks);
  }, []);

  return (
    <Router>
      <div style={layoutStyle}>
        <Sidebar />
        <div style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<TrucksList trucks={trucks} />} />
            <Route
              path="/trucks/:id"
              element={<TruckDetails trucks={trucks} setTrucks={setTrucks} />}
            />
            <Route path="/main" element={<MainPage trucks={trucks} />} />
            <Route path="/history" element={<HistoryPage trucks={trucks} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const layoutStyle = { display: "flex", width: "100%", minHeight: "100vh", background: "#fff" };
const mainContentStyle = { flex: 1, overflowY: "auto" };

export default App;
