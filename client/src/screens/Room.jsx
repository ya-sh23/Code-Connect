import React, { useEffect, useCallback } from "react";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined the Room...`);
  });

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center">Lobby</h1>
    </div>
  );
};

export default RoomPage;
