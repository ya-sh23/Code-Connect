import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="relative">
     
      <div className="absolute top-5 left-6 text-white text-xl font-bold">
        <NavLink to="/">logo</NavLink>
      </div>

      <nav
        className="w-full flex justify-center py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white rounded-lg"
      >
        <div
          className="px-6 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full shadow-lg flex space-x-6 font-bold"
        >
          <NavLink  to="/">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
