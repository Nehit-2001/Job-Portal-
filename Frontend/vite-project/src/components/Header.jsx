import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return; // ✅ prevent empty search
    dispatch(setSearchedQuery(query));
    setQuery("");
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchJobHandler(); // ✅ Enter key support
  };

  return (
    <div className="w-full bg-white">
      <div className="text-center px-4">
        <div className="flex flex-col gap-5 my-10 md:my-16">

          {/* Badge */}
          <span className="font-semibold mx-auto bg-gray-100 px-4 py-2 rounded-full text-[#141c28de] text-sm md:text-base">
            No.1 <span className="text-[#2777e7de]">Job Search Website</span>
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141c28de] leading-tight">
            Search, Apply & {" "}
            <span className="block sm:inline">
              Get Your <span className="text-[#2777e7de]">Dream Job</span>
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-[#141c28de] max-w-xl mx-auto leading-relaxed">
            Find your <span className="text-[#2777e7de]">dream job</span> and
            grow your career with ease. Connect with top companies
            and explore the best opportunities for you.
          </p>

          {/* Search Bar */}
          <div className="flex w-[90%] sm:w-[75%] md:w-[60%] mx-auto shadow-sm border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              value={query}
              placeholder="Find your dream job..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown} // ✅ Enter key
              className="outline-none w-full py-3 px-5 text-sm md:text-base text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={searchJobHandler}
              className="bg-[#2777e7de] text-white px-5 md:px-7 py-3 font-semibold text-sm md:text-base hover:bg-[#1a5fc8] transition duration-300 whitespace-nowrap"
            >
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;