import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react"; 
import { useSelector } from "react-redux";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { useNavigate, useParams } from "react-router-dom";

const JobPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get job ID from URL if editing
  const isEditMode = !!id;

  const { companies } = useSelector((store) => store.company);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode); // Loading for fetching job data
  const [toast, setToast] = useState({ text: "", type: "" });

  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    position: 0,
    requirements: "",
    experience: "",
    jobType: "",
  });

  // Fetch job data if in edit mode
  useEffect(() => {
    if (!isEditMode) {
      setFetchLoading(false);
      return;
    }

    const fetchJobData = async () => {
      try {
        setFetchLoading(true);
        const res = await fetch(`${JOB_API_ENDPOINT}/${id}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res?.ok && data?.success) {
          const job = data.job;
          
          // Populate form with existing job data
          setInput({
            title: job.title || "",
            description: job.description || "",
            location: job.location || "",
            salary: job.salary || "",
            companyId: job.company?._id || "",
            position: job.position || 0,
            requirements: job.requirements || "",
            experience: job.experience || "",
            jobType: job.jobType || "",
          });

          // Set the selected company
          if (job.company) {
            setSelected(job.company);
          }
        } else {
          showToast(data.message || "Failed to load job", "error");
          setTimeout(() => navigate("/admin/jobs"), 1500);
        }
      } catch (error) {
        showToast("Failed to fetch job data", "error");
        console.error(error);
        setTimeout(() => navigate("/admin/jobs"), 1500);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchJobData();
  }, [id, isEditMode, navigate]);

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3000);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const companyHandleChange = (company) => {
    setSelected(company);
    setInput({ ...input, companyId: company._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!input.title.trim()) return showToast("Job title is required", "error");
    if (!input.companyId) return showToast("Please select a company", "error");
    if (!input.location.trim()) return showToast("Location is required", "error");

    try {
      setLoading(true);

      const url = isEditMode 
        ? `${JOB_API_ENDPOINT}/${id}` 
        : `${JOB_API_ENDPOINT}/post`;
      
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (res?.ok && data?.success) {
        const message = isEditMode 
          ? data.message || "Job updated successfully!" 
          : data.message || "Job posted successfully!";
        
        showToast(message, "success");
        setTimeout(() => navigate("/admin/jobs"), 1000);
      } else {
        showToast(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      showToast(isEditMode ? "Failed to update job" : "Failed to post job", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white";
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

  // Show loading skeleton while fetching job data
  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toast */}
      {toast.text && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.text}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header - Dynamic based on mode */}
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-[#141c28de]">
            {isEditMode ? "Edit Job Listing" : "Post a New Job"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {isEditMode 
              ? "Update the job details and save your changes" 
              : "Fill in the details to post a job listing"}
          </p>
        </div>

        {/* No companies warning */}
        {companies.length === 0 && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm font-medium text-center">
            ⚠️ Please register a company before posting a job.
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={submitHandler} className="flex flex-col gap-5">

            {/* Responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Job Title <span className="text-red-400">*</span></label>
                <input
                  value={input.title}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  name="title"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Location <span className="text-red-400">*</span></label>
                <input
                  value={input.location}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="e.g. Mumbai, India"
                  name="location"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Salary <span className="text-gray-400 font-normal">(LPA)</span></label>
                <input
                  value={input.salary}
                  onChange={changeEventHandler}
                  type="number"
                  placeholder="e.g. 8"
                  name="salary"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Positions</label>
                <input
                  value={input.position}
                  onChange={changeEventHandler}
                  type="number"
                  placeholder="Number of openings"
                  name="position"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Experience <span className="text-gray-400 font-normal">(years)</span></label>
                <input
                  value={input.experience}
                  onChange={changeEventHandler}
                  type="number" 
                  placeholder="e.g. 2"
                  name="experience"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Job Type</label>
                <input
                  value={input.jobType}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="e.g. Full-time, Part-time"
                  name="jobType"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Requirements</label>
                <input
                  value={input.requirements}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="e.g. React, Node.js"
                  name="requirements"
                  className={inputClass}
                />
              </div>

            </div>

            {/* Description - full width */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={input.description}
                onChange={changeEventHandler}
                name="description"
                placeholder="Describe the job role and responsibilities..."
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Company Selector */}
            <div>
              <label className={labelClass}>Select Company <span className="text-red-400">*</span></label>
              <Listbox value={selected} onChange={companyHandleChange}>
                <div className="relative">
                  <ListboxButton className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer">
                    <div className="flex items-center gap-2">
                      {selected?.logo && (
                        <img src={selected.logo} alt="" className="w-5 h-5 rounded-full object-cover" />
                      )}
                      <span className={selected ? "text-gray-800" : "text-gray-400"}>
                        {selected ? selected.name : "Select a company"}
                      </span>
                    </div>
                    <ChevronsUpDown size={16} className="text-gray-400" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-20 w-full mt-1 max-h-48 overflow-auto rounded-xl bg-white shadow-lg border border-gray-100 py-1">
                    {companies.map((company) => (
                      <ListboxOption
                        key={company._id}
                        value={company}
                        className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <div className="flex items-center gap-2">
                          {company.logo && (
                            <img src={company.logo} alt="" className="w-5 h-5 rounded-full object-cover" />
                          )}
                          <span>{company.name}</span>
                        </div>
                        {selected?._id === company._id && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || companies.length === 0}
                className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm transition
                  ${loading || companies.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#2777e7de] hover:bg-blue-700 cursor-pointer"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditMode ? "Updating..." : "Posting..."}
                  </div>
                ) : (
                  isEditMode ? "Update Job" : "Post Job"
                )}
              </button>

              {isEditMode && (
                <button
                  type="button"
                  onClick={() => navigate("/admin/jobs")}
                  className="flex-1 py-2.5 rounded-xl text-gray-700 font-semibold text-sm transition bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPost;