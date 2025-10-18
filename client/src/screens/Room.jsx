import React, { useEffect, useCallback, useState } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  // when someone joins the same room
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined the Room...`);
    setRemoteSocketId(id);
  }, []);

  // call the other user
  const handleCallUser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      // add tracks once
      stream.getTracks().forEach((track) => peer.peer.addTrack(track, stream));

      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  }, [remoteSocketId, socket]);

  // when you receive a call
  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      stream.getTracks().forEach((track) => peer.peer.addTrack(track, stream));

      console.log("Incoming call:", from);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  // when your call is accepted
  const handleCallAccepted = useCallback(async ({ from, ans }) => {
    await peer.setRemoteAnswer(ans);
    console.log("Call Accepted!");
  }, []);

  // handle remote tracks
  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const [stream] = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(stream);
    });
  }, []);

  // handle socket events
  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted]);

  const handleToggleAudio = () => {
    if (!myStream) return;
    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted((prev) => !prev);
  };

  const handleToggleVideo = () => {
    if (!myStream) return;
    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoOff((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2 text-white">
      <h1 className="text-4xl font-bold">Lobby</h1>
      <h4>{remoteSocketId ? "Connected" : "Waiting for user..."}</h4>

      {remoteSocketId && (
        <>
          {!isCallActive ? (
            <button className="bg-green-600 px-6 py-3 rounded-lg cursor-pointer"
            onClick={async()=>{
              await handleCallUser();
              setIsCallActive(true);
            }}>
              📞 Call
            </button>
          ) : (
            <button
            className="bg-red-600 px-6 py-3 rounded-lg cursor-pointer"
            onClick={()=>{
              peer.peer.close();
              myStream?.getTracks().forEach((track)=>track.stop());
              setMyStream(null);
              setRemoteStream(null);
              setIsCallActive(false);
              setRemoteSocketId(null);
              navigate("/");
            }}
            >🔴 Disconnect</button>
          )}
        </>
      )}

      {myStream && (
        <>
          <h2>My Stream</h2>
          <video
            autoPlay
            muted
            ref={(vid) => {
              if (vid) vid.srcObject = myStream;
            }}
            className="h-[300px] w-[500px] rounded-lg border border-white/30 mt-4"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleToggleAudio}
              className="bg-gray-700 px-4 py-2 rounded-md"
            >
              {isMuted ? "🔇 Unmute" : "🎙️ Mute"}
            </button>
            <button
              onClick={handleToggleVideo}
              className="bg-gray-700 px-4 py-2 rounded-md"
            >
              {isVideoOff ? "📷 Start Video" : "📹 Stop Video"}
            </button>
          </div>
        </>
      )}

      {remoteStream && (
        <>
          <h2>Remote Stream</h2>
          <video
            autoPlay
            ref={(vid) => {
              if (vid) vid.srcObject = remoteStream;
            }}
            className="h-[300px] w-[500px] rounded-lg border border-white/30 mt-4"
          />
        </>
      )}
    </div>
  );
};

export default RoomPage;
