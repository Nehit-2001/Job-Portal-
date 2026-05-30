import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react"; 

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs); 
  const [showFilter, setShowFilter] = useState(false); //mobile filter toggle

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }
    const query = searchedQuery.toLowerCase();
    const filteredJobs = allJobs.filter((job) => {
      return (
        job?.title?.toLowerCase().includes(query) ||
        job?.description?.toLowerCase().includes(query) ||
        String(job?.salary ?? "").toLowerCase().includes(query) ||
        job?.location?.toLowerCase().includes(query) ||
        String(job?.experience ?? "").toLowerCase().includes(query)
      );
    });
    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-6"> 

        {/* Mobile Filter Toggle Button */}
        <div className="flex md:hidden justify-between items-center mb-4">
          <p className="text-sm text-gray-500">{filterJobs.length} jobs found</p>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 text-sm font-medium bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm"
          >
            {showFilter ? <X size={16} /> : <SlidersHorizontal size={16} />}
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex gap-5">

          {/* Filter Sidebar - Desktop always visible, mobile toggleable */}
          <div className={`
            ${showFilter ? "block" : "hidden"} 
            md:block 
            w-full md:w-[22%] lg:w-[20%] 
            shrink-0
          `}>
            <FilterCard />
          </div>

          {/* Job Cards */}
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                {/* Job count - desktop */}
                {/* <p className="hidden md:block text-sm text-gray-500 mb-4">
                  {filterJobs.length} jobs found
                </p> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8"> {/* responsive grid */}
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <JobCard job={job} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;