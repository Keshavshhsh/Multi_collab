import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password. Please try again.");
      }

      // Save token in local storage
      localStorage.setItem("token", data.accesstoken);
      localStorage.setItem("email", email);
      
      toast.success("Login successful!");
      // Navigate to profile
      navigate("/profile");
    } catch (error) {
      console.error(error);
      const errorMsg = error.message || "Invalid email or password. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 pt-20">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back</h1>
        <p className="text-gray-300 text-center mb-6">Login to your account</p>

        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-center mb-4 p-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-t-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-purple-400 font-semibold hover:text-purple-300 transition"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}
