import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../service/auth";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Password do not match!!");
    }
    try {
      const res = await signup(fullname, email, password, confirmPassword);
      setMessage(res.message);
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      setMessage(
        "Signup failed. Please try again later. Error: " + error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-8 gap-3 rounded-2xl shadow-xl w-96 bg-white/30 backdrop-blur-md border border-white/30"
      >
        <h1 className="text-4xl font-bold text-white text-center">SignUp</h1>
        <label htmlFor="text" className="text-white">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter Your Full Name"
          id="name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
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
        <label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirmed Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className="mt-4 bg-blue-600 rounded-lg text-white py-2 hover:bg-blue-700 transition">
          Submit
        </button>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        <p className="text-center text-sm text-black mt-4">
          Have account already?{" "}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
