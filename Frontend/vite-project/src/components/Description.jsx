import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/data.js";
import axios from "axios";

const Description = () => {
  const param = useParams();
  const jobId = param.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  // console.log(singleJob);
  // console.log(jobId);
  
  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) =>
        application.applicant?._id?.toString() === user?._id?.toString() ||
        application.applicant?.toString() === user?._id?.toString(),
    ) || false;
  const [isApplied, setisApplied] = useState(isIntiallyApplied);
  const applyJobHandler = async () => {
    try {
      const res = await fetch(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        method: "POST",
        credentials: "include", // important for cookies
      });

      const data = await res.json();

      // ✅ Fix - dispatch should be inside the if block
      if (res.ok && data.success) {
        setisApplied(true);
        const updateSinglejob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSinglejob)); 
        // console.log(data.message);
        alert(data.message);
      } else {
        console.error("Failed:", data?.message ?? "Unknown error");
        alert(data?.message ?? "Something went wrong");
        return;
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await fetch(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          method: "GET",
          credentials: "include", // important for cookies
        });

        if (!res.ok) {
          console.error("Status:", res.status);
          return;
        }

        const data = await res.json();
        // console.log(data);

        if (res.ok && data.success) {
    dispatch(setSingleJob(data.job));
    
    // console.log("applications:", data.job.application);
    // console.log("user._id:", user?._id);
    
    const applied = data.job.application.some((application) => {
        // console.log("applicant value:", application.applicant); // ← key log!
        // console.log("applicant type:", typeof application.applicant); // ← type!
        return application.applicant?.toString() === user?._id?.toString();
    });
    
    // console.log("Final isApplied:", applied); // ← is this true or false?
    setisApplied(applied);
} else {
          console.error("Failed:", data?.message ?? "Unknown error");
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex gap-2 my-3 items-center">
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-[#0e3e83de] inset-ring inset-ring-gray-500/10">
                {singleJob?.position} Position
              </span>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-red-500 inset-ring inset-ring-gray-500/10">
                {singleJob?.salary} LPA
              </span>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-black inset-ring inset-ring-gray-500/10">
                Office
              </span>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-[#667513de] inset-ring inset-ring-gray-500/10">
                {singleJob?.jobType}
              </span>
            </div>
          </div>

          {/* Apply Button */}
          <div>
            <button
              disabled={isApplied}
              onClick={isApplied ? null : applyJobHandler}
              className="border cursor-pointer rounded-2xl px-2 py-1 text-sm bg-gray-700 text-white font-semibold"
            >
              {isApplied ? "Already Applied" : "Apply"}
            </button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-500 my-4 font-semibold">
          {singleJob?.description}
        </h1>
        <div>
          <h1 className="font-bold my-1">
            Role :
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Job Type :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Opening :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.position}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.experience}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            No. of Applicants :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.application?.length <= 0
                ? "0"
                : singleJob?.application?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Post Date :{" "}
            <span className="font-normal pl-3 text-gray-600">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Description;
