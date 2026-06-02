import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { Building2 } from "lucide-react";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3000);
  };

  const registerNewCompany = async () => {
    if (!companyName.trim()) return showToast("Company name is required", "error"); // ✅ validation

    try {
      setLoading(true);
      const res = await fetch(`${COMPANY_API_ENDPOINT}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, description }),
      });

      const data = await res.json();

      if (res?.ok && data?.success) {
        dispatch(setSingleCompany(data?.company));
        showToast(data.message || "Company created!", "success");
        const companyId = data?.company?._id;
        setTimeout(() => navigate(`/admin/companies/${companyId}`), 1000); // ✅ navigate after toast
      } else {
        showToast(data?.message || "Something went wrong", "error");
      }
    } catch (error) {
      showToast("Failed to create company", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white";
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ✅ Toast */}
      {toast.text && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.text}
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-10"> {/* ✅ responsive padding */}

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-[#141c28de]">Register Company</h1>
            <p className="text-gray-400 text-sm mt-0.5">Add your company details to get started</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">

          {/* Company Name */}
          <div>
            <label className={labelClass}>Company Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              placeholder="e.g. Google, Microsoft..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              placeholder="Brief description of your company..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate("/admin/companies")}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={registerNewCompany}
              disabled={loading}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition
                ${loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#2777e7de] hover:bg-blue-700 cursor-pointer"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Company"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;