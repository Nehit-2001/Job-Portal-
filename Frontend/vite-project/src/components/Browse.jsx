import React, { useEffect } from "react";
import Navbar from "./Navbar";
import JobCard from "./JobCard";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../Hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery("")); 
    };
  }, [dispatch]); 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10"> 

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#141c28de]">
            Search Results
            
          </h1>
        </div>

        {/* Jobs Grid */}
        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-medium">No jobs found</p>
            <p className="text-sm mt-1">Try a different search keyword</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}

      </main>

      <Footer /> 
    </div>
  );
};

export default Browse;