import { BookMarkedIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currTIme = new Date();
    const timeDiff = currTIme.getTime() - createdAt.getTime();
    return Math.floor(timeDiff / (24 * 3600 * 1000));
  };
  // const jobId = 1;
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BookMarkedIcon className="cursor-pointer" size={18} />
        </button>
      </div>

      {/* Company Logo */}
      <div>
        <img
          className="w-10 h-10 object-contain rounded-md mb-3"
          src={job?.company?.logo}
          alt="img"
        />
      </div>

      {/* Example Text */}
      <div>
        <p className="text-gray-500 text-sm">{job?.company?.name}</p>
        <h2 className="font-semibold text-sm">{job?.title}</h2>
        <p className="text-sm text-[#141c28de]">{job?.description}</p>
        <div className="flex gap-2 my-3 items-center">
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-[#0e3e83de] inset-ring inset-ring-gray-500/10">
            {job?.position} Position
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-red-500 inset-ring inset-ring-gray-500/10">
            {job?.salary} LPA
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-black inset-ring inset-ring-gray-500/10">
            Office
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-[#667513de] inset-ring inset-ring-gray-500/10">
            {job?.jobType}
          </span>
        </div>
        <div className="flex gap-4">
          <span
            onClick={() => {
              navigate(`/description/${job._id}`);
            }}
            className="cursor-pointer inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-black inset-ring inset-ring-gray-500/10"
          >
            Details
          </span>
          <span className="cursor-pointer inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-[#667513de] inset-ring inset-ring-gray-500/10">
            Save for Later
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
