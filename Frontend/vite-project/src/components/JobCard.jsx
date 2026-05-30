import { BookMarkedIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currTime = new Date();
    const timeDiff = currTime.getTime() - createdAt.getTime();
    return Math.floor(timeDiff / (24 * 3600 * 1000));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between h-full"> {/* ✅ hover + full height */}

      {/* Top Row */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-gray-400">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Bookmark">
          <BookMarkedIcon className="cursor-pointer" size={18} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        {job?.company?.logo ? (
          <img
            className="w-10 h-10 object-contain rounded-md border border-gray-100"
            src={job?.company?.logo}
            alt={job?.company?.name}
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
            {job?.company?.name?.charAt(0) || "?"}
          </div>
        )}
        <p className="text-gray-500 text-sm font-medium">{job?.company?.name}</p>
      </div>

      {/* Job Info */}
      <div className="flex-1">
        <h2 className="font-semibold text-base text-[#141c28de] mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{job?.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 my-3"> 
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100">
            {job?.position} Position
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-500 border border-red-100">
            {job?.salary} LPA
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-700 border border-gray-200">
            {job?.jobType || "Office"}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-50 text-green-700 border border-green-100">
            {job?.location}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => navigate(`/description/${job?._id}`)} //optional chaining
          className="flex-1 bg-[#2777e7de] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#1a5fc8] transition"
        >
          View Details
        </button>
        <button className="flex-1 border border-gray-200 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 transition text-gray-700">
          Save for Later
        </button>
      </div>

    </div>
  );
};

export default JobCard;