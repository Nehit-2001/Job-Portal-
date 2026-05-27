import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// const randomJob = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.allJobs || []);
  return (
    <div className='max-w-7xl mx-15 my-20'>
      <h2 className='text-4xl ml-3.5 font-semibold text-[#141c28de]'>
        <span className='text-[#2777e7de]'>Latest</span> Job Openings
      </h2>

      {/* Job Cards */}
      <div className='grid grid-cols-3 gap-4'>
        {!allJobs || allJobs.length === 0 ? (
  <span>No jobs available</span>
) : (
  allJobs.slice(0, ).map((job) =>
    job?._id ? (
      
      <JobCards key={job._id} job={job} />
      
    ) : (
      <span key={job._id || Math.random()}>Invalid Job Data</span>
    )
  )
)}
      </div>
    </div>
  )
}

export default LatestJobs
