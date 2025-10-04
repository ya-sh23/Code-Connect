import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
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
      const { email, room } = data;
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col bg-white p-8 gap-3 rounded-2xl shadow-xl w-96 bg-white/30 backdrop-blur-md border border-white/30"
      >
        <h1 className="text-4xl font-bold text-white text-center">Lobby</h1>

        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <label htmlFor="room" className="text-white">
          Room Number
        </label>
        <input
          type="text"
          placeholder="Enter Room ID"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button className="mt-4 bg-blue-600 rounded-lg text-white py-2 hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;
