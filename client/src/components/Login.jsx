import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
      <form className="flex flex-col bg-white p-8 gap-3 rounded-2xl shadow-xl w-96 bg-white/30 backdrop-blur-md border border-white/30">
        <h1 className="text-4xl font-bold text-white text-center">Login</h1>

        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          id="email"
          // value={}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          // value={}
          className="px-4 py-2 rounded-lg border border-white/50 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button className="mt-4 bg-blue-600 rounded-lg text-white py-2 hover:bg-blue-700 transition">
          Submit
        </button>
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
