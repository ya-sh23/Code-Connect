import React from "react";
import Navbar from "../components/Navbar";
import imgs from "../assets/img.png"
import { useNavigate } from "react-router-dom";

const Home = () => {
  
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
        <Navbar />
        <div className="flex items-center justify-between">
          <div className="mt-20 mx-20 w-fit">
            <h1 className="text-6xl font-bold leading-tight">
              Code <br />
              Together <br />
              Connect Instantly
            </h1>

            <p className=" text-xl mt-8">
              Pair program, debug, and learn with peers in a real-time
              environment. Video call while coding simultaneously.
            </p>

            <div className="flex items-center space-x-4 mt-8">
              {/* MAIN BUTTON */}
              <button
                onClick={() =>
                  token ? navigate("/lobby") : navigate("/login")
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.95]"
              >
                {token ? "Go to Lobby" : "Start Coding Now"}
              </button>
            </div>
          </div>

          <div className="flex justify-end w-full pr-40">
            <img
              src={imgs}
              className="w-[400px] h-[400px] object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
