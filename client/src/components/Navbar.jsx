
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../service/auth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still remove token and navigate even if server logout fails
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
      <div className="text-xl font-bold flex items-center">
        <NavLink to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-40 md:h-16 lg:h-20 w-auto object-contain drop-shadow-l"
          />
        </NavLink>
      </div>

      <div className="px-6 py-3  bg-white/20 backdrop-blur-lg border border-white/30 rounded-full shadow-lg flex space-x-6 font-bold transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-white/30 active:scale-[0.97] active:bg-white/40">
        <NavLink
          to="/"
          className="transition-all duration-200 hover:text-purple-300 hover:scale-[1.05] active:scale-[0.95]"
        >
          Home
        </NavLink>

        <NavLink
          to="/pricing"
          className=" transition-all duration-200 hover:text-purple-300 hover:scale-[1.05] active:scale-[0.95] "
        >
          Pricing
        </NavLink>

        <NavLink
          to="/about"
          className=" transition-all duration-200 hover:text-purple-300 hover:scale-[1.05] active:scale-[0.95]"
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className=" transition-all duration-200 hover:text-purple-200 hover:scale-[1.05] active:scale-[0.95]"
        >
          Contact Us
        </NavLink>
      </div>

      <div className="flex space-x-4">
        {!token && (
          <>
            <NavLink
              to="/signup"
              className="px-6 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full shadow-lg font-bold transition-all duration-200 ease-outhover:scale-[1.03] hover:bg-white/30 active:scale-[0.95] active:bg-white/40"
            >
              SignUp
            </NavLink>
            <NavLink
              to="/login"
              className="px-6 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full shadow-lg font-bold transition-all duration-200 ease-outhover:scale-[1.03] hover:bg-white/30 active:scale-[0.95] active:bg-white/40"
            >
              Login
            </NavLink>
          </>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full shadow-lg font-bold transition-all duration-200 ease-outhover:scale-[1.03] hover:bg-white/30 active:scale-[0.95] active:bg-white/40"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
