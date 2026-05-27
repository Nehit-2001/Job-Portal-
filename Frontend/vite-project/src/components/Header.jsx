import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler =  ()=> {
    dispatch(setSearchedQuery(query));
    setQuery("");
    navigate("/browse");
  }
  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-12">
          <span className="font-semibold borer mx-auto bg-gray-200 px-4 py-2 rounded-full text-[#141c28de]">
            No.1 <span className="text-[#2777e7de]"> Job Search Website</span>
          </span>

          <h2 className="text-5xl font-bold text-[#141c28de]">
            Search, Apply & <br />
            Get Your <span className="text-[#2777e7de]">Dream Job</span>
          </h2>
          <p className="text-sm text-[#141c28de]">
            Find your <span className="text-[#2777e7de]">dream job</span> and
            grow your career with ease. Connect with top companies <br />
            and explore the best opportunities for you.
          </p>
          <div className="flex w-[60%] shadow-gray-400 border border-gray-300 rounded-full pl-4 mx-auto">
            <input
              type="text"
              placeholder="find your dream job"
              onChange={(e)=> setQuery(e.target.value)}
              className="outline-none border-[#141c28de] w-full h-5 mt-4"
            />
            <button onClick={searchJobHandler} className="rounded-r-full p-3 flex justify-center items-center font-bold cursor-pointer hover:bg-[#141c28de] hover:text-white hover:transition delay-100 duration-300 ease-in-out">Submit</button>
            
            {/* <button className="border border-gray-500 p-2 px-4 m-2 cursor-pointer rounded-3xl font-bold hover:bg-[#141c28de] hover:text-white">
              Submit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
