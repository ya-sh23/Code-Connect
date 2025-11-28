import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import Navbar from "../components/Navbar";

const LobbyScreen = () => {
  const savedEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(savedEmail || "");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoin = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoin);
    return () => {
      socket.off("room:join", handleJoin);
    };
  }, [socket, handleJoin]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
      <Navbar />

      <div className="flex justify-center items-center min-h-[80vh]">
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col bg-white/30 backdrop-blur-md p-8 gap-3 rounded-2xl shadow-xl w-96 border border-white/30 "
        >
          <h1 className="text-4xl font-bold text-white text-center">Lobby</h1>

          <label className="text-white">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <label className="text-white">Room Number</label>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button className="mt-4 bg-blue-600 rounded-lg text-white py-2 hover:bg-blue-700 transition">
            Start Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
