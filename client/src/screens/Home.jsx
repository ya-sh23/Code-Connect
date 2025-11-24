import React from "react";
import Navbar from "../components/Navbar";
import imgs from "../assets/img.png"

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-purple-800 text-white">
        <Navbar />
        <div className="flex items-center justify-between">
          <div className="mt-20 mx-20 w-fit">
            <h1 className="text-7xl font-bold leading-tight">
              Your smart <br /> parenting <br />
              <span className="">companion</span>
            </h1>

            <p className=" text-xl mt-8">
              From toddler to teenager — our AI helps you grow with your family.
            </p>

            <div className="flex items-center space-x-4 mt-8">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-200 ease-outhover:scale-[1.03] hover:bg-purple/30 active:scale-[0.95] active:bg-purple/40">
                Get started
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
