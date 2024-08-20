import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from 'react';
import axois from 'axios';
import { Header } from "./components/header/header.component";
import { HomePage } from "./pages/homepage/homepage.component";
import { AdventurePage } from "./pages/adventure-page/adventure-page.component";

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axois.get(
        `https://mxpertztestapi.onrender.com/api/adventure`
      );
      setData(response.data);
    } catch (err) {
      console.error({ error: err.message });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/adventure/:id" element={<AdventurePage data={data}/>} />
      </Routes>
    </div>
  );
}

export default App;
