import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function WhiteHome() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID generated!");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    // Save username to localStorage for later use
    localStorage.setItem("username", username);
    
    // Navigate to the whiteboard room
    navigate(`/whiteboard/${roomId}`);
    toast.success("Joining room...");
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      joinRoom(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6 pt-32">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg p-8 rounded-2xl text-center border border-white/20 hover:border-white/40 transition">
        {/* Logo */}
        <div className="mb-6">
          <div className="text-6xl mb-2">🎨</div>
          <h1 className="text-3xl font-bold text-white">WhiteBoard</h1>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Create or Join Room</h2>
        <p className="text-gray-300 mb-6">Collaborate in real-time with your team</p>

        {/* Input Fields */}
        <form onSubmit={joinRoom} className="space-y-4">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ROOM ID"
            onKeyDown={handleInputEnter}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
            onKeyDown={handleInputEnter}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          
          {/* Join Button */}
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition transform hover:scale-105"
          >
            JOIN ROOM 🚀
          </button>
        </form>

        {/* Generate Room Link */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-gray-300 mb-3">
            Don't have a room ID?
          </p>
          <button
            onClick={generateRoomId}
            className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition"
          >
            🔑 Generate New Room
          </button>
          {roomId && (
            <p className="mt-3 text-sm text-indigo-300">
              📋 ID: <span className="font-mono font-bold">{roomId}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WhiteHome;
