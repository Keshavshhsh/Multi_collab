import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import WhiteBoard from "../WhiteBoard";

const ENDPOINT = import.meta.env.VITE_SERVER;

function Container() {
  const { roomid } = useParams();
  const [socketRef, setSocketRef] = useState(null);
  const [username, setUsername] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const newSocket = io(ENDPOINT, {
      auth: { token },
    });

    newSocket.on("connect", () => {
      toast.success("Connected to server");
      setUsername(localStorage.getItem("username") || "Anonymous");
      setSocketRef(newSocket);
      setIsReady(true);
    });

    newSocket.on("disconnect", () => {
      toast.error("Disconnected from server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (!isReady || !socketRef) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl">Loading Whiteboard...</div>
      </div>
    );
  }

  return (
    <div className="fixed w-full h-full bg-black">
      <WhiteBoard socketRef={{ current: socketRef }} roomid={roomid} username={username} />
    </div>
  );
}

export default Container;
