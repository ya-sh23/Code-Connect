import React, { useEffect, useCallback, useState } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

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

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incomming call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:negotiation:needed", { offer, to: remoteSocketId });
  }, []);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [handleNegotiationNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]); // 1st ele of stream array
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:negotiation:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:negotiation:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoFinal,
  ]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2 text-white">
      <h1 className="text-4xl font-bold">Lobby</h1>
      <h4>{remoteSocketId ? "Connected" : "No one is in the room"}</h4>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && (
        <button
          className="bg-red-600 px-5 px-3 rounded-lg cursor-pointer"
          onClick={handleCallUser}
        >
          Call
        </button>
      )}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <video
            autoPlay
            muted
            className="h-[300px] w-[600px] rounded-lg border border-white/30 mt-4"
            ref={(vid) => {
              if (vid) vid.srcObject = myStream;
            }}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <video
            autoPlay
            muted
            className="h-[300px] w-[600px] rounded-lg border border-white/30 mt-4"
            ref={(vid) => {
              if (vid) vid.srcObject = remoteStream;
            }}
          />
        </>
      )}
    </div>
  );
};

export default RoomPage;
