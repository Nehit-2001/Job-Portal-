import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const JobCards = ({ job }) => {
  const navigate = useNavigate(); 

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)} 
      className="mx-3 my-3 p-5 bg-white border border-gray-100 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:border-blue-200 transition duration-300" // ✅ removed hover:p-4 layout shift
    >
      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        {job?.company?.logo ? (
          <img
            src={job?.company?.logo}
            alt={job?.company?.name}
            className="w-10 h-10 rounded-lg object-contain border border-gray-100"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
            {job?.company?.name?.charAt(0) || "?"}
          </div>
        )}
        <div>
          <h1 className="text-sm font-semibold text-[#141c28de]">{job?.company?.name}</h1>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin size={11} /> {job?.location}
          </p>
        </div>
      </div>

      {/* Job Info */}
      <h2 className="text-base font-semibold text-[#141c28de] mb-1">{job?.title}</h2>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3"> 
        {job?.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2"> 
        <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100">
          {job?.position} Position
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-500 border border-red-100">
          {job?.salary} LPA
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-600 border border-gray-200">
          {job?.jobType || "Office"}
        </span>
      </div>
    </div>
  );
};

export default JobCards;