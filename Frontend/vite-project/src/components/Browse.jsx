import React, { useEffect } from "react";
import Navbar from "./Navbar";
import JobCard from "./JobCard";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../Hooks/useGetAllJobs"

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store)=> store.job);
  const dispatch = useDispatch();
  useEffect(()=> {
    return ()=> {
      dispatch(setSearchedQuery(""));
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className="w-full mx-auto my-10">
        {/* <h1 className="font-semibold text-xl ml-5">Search Result {allJobs.length}</h1> */}
        <div className="grid grid-cols-3 gap-4 mx-5 my-4">
            {allJobs.map((job, index) => (
          
            <JobCard key={job._id} job={job}/>
          
        ))}
        </div>
        <div>
            <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Browse;
