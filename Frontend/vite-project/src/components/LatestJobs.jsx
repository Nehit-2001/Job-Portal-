import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.allJobs || []);

  return (
    <div className='max-w-6xl mx-auto px-4 my-16'> {/* fixed mx-15 */}

      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl md:text-4xl font-semibold text-[#141c28de]'> {/* responsive text */}
          <span className='text-[#2777e7de]'>Latest</span> Job Openings
        </h2>
        <Link
          to="/jobs"
          className='text-sm md:text-base text-[#2777e7de] font-medium hover:underline'
        >
          View All →
        </Link>
      </div>

      {/* Job Cards */}
      {!allJobs || allJobs.length === 0 ? (
        <div className='text-center py-16 text-gray-400 text-base'>
          No jobs available at the moment.
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'> {/* responsive grid */}
          {allJobs.slice(0, 6).map((job) => // limit to 6
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : null // cleaner fallback
          )}
        </div>
      )}

    </div>
  )
}

export default LatestJobs