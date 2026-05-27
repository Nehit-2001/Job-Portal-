import { Badge } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const JobCards = ({job}) => {
  const navigat = useNavigate();
  return (
    <div onClick={()=> navigat(`/description/${job._id}`)} className="mx-3.5 my-3.5 p-5 border-gray-200 bg-gray-100 rounded-md shadow-xl cursor-pointer hover:shadow-2xl hover:shadow-blue-300 hover:p-4">
      <div>
        <h1 className="text-lg font-semibold text-[#141c28de]">{job?.company?.name}</h1>
        <p className="text-[#30353dde] text-md">{job?.location}</p>
      </div>
      <div>
        <h2 className="text-[#141c28de] text-md font-semibold">{job?.title}</h2>
        <p className="text-sm text-[#141c28de]">
          {job.description}
        </p>
      </div>
      <div className="flex gap-2 my-3 items-center">
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-[#0e3e83de] inset-ring inset-ring-gray-500/10">
          {job?.position}
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
    </div>
  );
};

export default JobCards;
