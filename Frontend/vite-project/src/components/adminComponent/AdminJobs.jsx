import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "../../Hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";
import { Plus } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]); 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10"> 

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#141c28de]">Posted Jobs</h1>
          <p className="text-sm text-gray-400 mt-1">Manage all your job postings</p>
        </div>

        {/* Filter + Post Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Filter by name, role..."
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white" 
          />
          <button
            onClick={() => navigate("/admin/job/create")}
            className="flex items-center justify-center gap-2 bg-[#2777e7de] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <AdminJobTable />
        </div>

      </div>
    </div>
  );
};

export default AdminJobs;