import "./App.css";
import { Routes, Route } from "react-router-dom";
//pages & components
import Atlas from "./pages/Atlas";
import Background from "./pages/Background";
import Home from "./pages/Home";
import BattleDetail from "./pages/BattleDetail";
import Commanders from "./pages/Commanders";
import CommanderDetail from "./pages/CommanderDetail";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/battles/:id" element={<BattleDetail />} />
        <Route path="/commanders" element={<Commanders />} />
        <Route path="/commanders/:id" element={<CommanderDetail />} />
        <Route path="/background" element={<Background />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
