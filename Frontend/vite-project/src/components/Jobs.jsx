import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, , 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setfilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setfilterJobs(allJobs);
      return;
    }
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(query) ||
        job?.description?.toLowerCase().includes(query) ||
        String(job?.salary ?? "")
          .toLowerCase()
          .includes(query) ||
        job?.location?.toLowerCase().includes(query) ||
        String(job?.experience ?? "")
          .toLowerCase()
          .includes(query)
      );
    });

    setfilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className="flex mx-auto mt-4 h-fit">
        {/* Filter Cards */}
        <div className="w-[15%] mx-3 overflow">
          <FilterCard />
        </div>

        {/* Job Card */}
        {filterJobs.length <= 0 ? (
          <span>Jobs Not Found</span>
        ) : (
          <div className="overflow-y-auto flex-1 pb-5 h-full">
            <div className="grid grid-cols-3 gap-5">
              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  key={job.id}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
Jobs;
