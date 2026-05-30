import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/data.js";
import axios from "axios";

const Description = () => {
  const { id: jobId } = useParams(); 
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  const [toast, setToast] = useState(null); 

  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) =>
        application.applicant?._id?.toString() === user?._id?.toString() ||
        application.applicant?.toString() === user?._id?.toString()
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // sync isApplied when singleJob updates
  useEffect(() => {
    if (singleJob && user) {
      const applied = singleJob.application?.some(
        (app) =>
          app.applicant?._id?.toString() === user?._id?.toString() ||
          app.applicant?.toString() === user?._id?.toString()
      );
      setIsApplied(applied);
    }
  }, [singleJob, user]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const applyJobHandler = async () => {
    try {
      const res = await fetch(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        showToast(data.message || "Applied successfully!"); //toast
      } else {
        showToast(data?.message ?? "Something went wrong", "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true); 
      try {
        const res = await fetch(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          dispatch(setSingleJob(data.job));
          const applied = data.job.application?.some(
            (app) => app.applicant?.toString() === user?._id?.toString()
          );
          setIsApplied(applied);
        }
      } catch (error) {
        console.log("Error fetching job:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Detail row component
  const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-0">
      <span className="font-semibold text-sm text-[#141c28de] sm:w-40 shrink-0">{label}</span>
      <span className="text-sm text-gray-600 mt-1 sm:mt-0">{value || "N/A"}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ✅ Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 my-10">

        {/* Top Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">

          {/* Company Info */}
          <div className="flex items-center gap-3 mb-4">
            {singleJob?.company?.logo ? (
              <img
                src={singleJob?.company?.logo}
                alt="company"
                className="w-12 h-12 object-contain rounded-lg border border-gray-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-lg">
                {singleJob?.company?.name?.charAt(0) || "?"}
              </div>
            )}
            <p className="text-gray-500 font-medium text-sm">{singleJob?.company?.name}</p>
          </div>

          {/* Job Title + Apply Button */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="font-bold text-xl md:text-2xl text-[#141c28de]">
                {singleJob?.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 my-3">
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  {singleJob?.position} Position
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-500 border border-red-100">
                  {singleJob?.salary} LPA
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-700 border border-gray-200">
                  {singleJob?.jobType || "Office"}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-50 text-green-700 border border-green-100">
                  {singleJob?.location}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              disabled={isApplied}
              onClick={isApplied ? null : applyJobHandler}
              className={`shrink-0 px-6 py-2 rounded-xl text-sm font-semibold transition
                ${isApplied
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-[#2777e7de] text-white hover:bg-[#1a5fc8] cursor-pointer"
                }`}
            >
              {isApplied ? "Already Applied ✓" : "Apply Now"}
            </button>
          </div>

        </div>

        {/* Description + Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-bold text-base text-[#141c28de] mb-2">Job Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{singleJob?.description}</p>
          </div>

          <hr className="mb-4" />

          {/* Details */}
          <h2 className="font-bold text-base text-[#141c28de] mb-2">Job Details</h2>
          <div className="divide-y divide-gray-50">
            <DetailRow label="Role" value={singleJob?.title} />
            <DetailRow label="Location" value={singleJob?.location} />
            <DetailRow label="Salary" value={singleJob?.salary ? `${singleJob.salary} LPA` : null} />
            <DetailRow label="Job Type" value={singleJob?.jobType} />
            <DetailRow label="Openings" value={singleJob?.position} />
            <DetailRow label="Experience" value={singleJob?.experience} />
            <DetailRow
              label="Applicants"
              value={singleJob?.application?.length || "0"}
            />
            <DetailRow
              label="Posted On"
              value={singleJob?.createdAt?.split("T")[0]}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Description;