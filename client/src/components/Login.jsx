import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/auth";

const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res && res.success) {
        const token = res.data?.token;
        const user = res.data?.user;

        if (token) {
          localStorage.setItem("token", token);
        }
        if (user?.email) {
          localStorage.setItem("email", user.email);
        }

        setMessage(res.message || "Login successful");
        navigate("/lobby");
      } else {
        setMessage(res?.message || "Login failed");
      }
    } catch (error) {
      setMessage("Login failed. Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-8 gap-3 rounded-2xl shadow-xl w-96 bg-white/30 backdrop-blur-md border border-white/30"
      >
        <h1 className="text-4xl font-bold text-white text-center">Login</h1>

        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button className="mt-4 bg-blue-600 rounded-lg text-white py-2 hover:bg-blue-700 transition">
          Submit
        </button>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        <p className="text-center text-sm text-black mt-4">
          Don't have account ?{" "}
          <a href="/signup" className="text-white hover:underline">
            SignUp
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
