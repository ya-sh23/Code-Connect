import { Routes, Route } from "react-router-dom";

import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import Home from "./screens/Home";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="App bg-gray-800">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/lobby" element={<LobbyScreen/>} />
        <Route path="/room/:roomId" element={<RoomPage/>} />
      </Routes>
    </div>
  );
}

export default App;
