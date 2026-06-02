import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ComapniesTable from "./ComapniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../Hooks/useGetAllCompanies.jsx";
import { useDispatch } from "react-redux";
import { setSearchCompanybyText } from "../../redux/companySlice";
import { Plus } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanybyText(input));
  }, [input, dispatch]); // ✅ added dispatch

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10"> {/* ✅ responsive padding */}

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#141c28de]">Companies</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your registered companies</p>
        </div>

        {/* Filter + Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Filter by company name..."
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white" // ✅ fixed typo + styled
          />
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="flex items-center justify-center gap-2 bg-[#2777e7de] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
          >
            <Plus size={16} />
            Add Company
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ComapniesTable />
        </div>

      </div>
    </div>
  );
};

export default Companies;