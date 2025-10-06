import React, { useEffect, useCallback, useState } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined the Room...`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
      setMyStream(stream);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(({ from, offer }) => {
    console.log(`Incomming call`, from, offer);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
    };
  }, [socket, handleUserJoined, handleIncommingCall]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2 text-white">
      <h1 className="text-4xl font-bold">Lobby</h1>
      <h4>{remoteSocketId ? "Connected" : "No one is in the room"}</h4>
      {remoteSocketId && (
        <button
          className="bg-red-600 px-5 px-3 rounded-lg cursor-pointer"
          onClick={handleCallUser}
        >
          Call
        </button>
      )}
      {myStream && (
        <video
          autoPlay
          muted
          className="h-[300px] w-[600px] rounded-lg border border-white/30 mt-4"
          ref={(vid) => {
            if (vid) vid.srcObject = myStream;
          }}
        />
      )}
    </div>
  );
};

export default RoomPage;
