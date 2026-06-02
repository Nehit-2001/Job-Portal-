import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ArrowLeft } from "lucide-react";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../Hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "" });

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3000);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await fetch(`${COMPANY_API_ENDPOINT}/update/${params.id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || "Company updated!", "success");
        setTimeout(() => navigate("/admin/companies"), 1000); // ✅ navigate after toast
      } else {
        showToast(data?.message || "Something went wrong", "error");
      }
    } catch (error) {
      showToast("Failed to update company", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

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
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#141c28de]">Company Setup</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={submitHandler} className="flex flex-col gap-5">

            {/* ✅ Responsive grid - 1 col mobile, 2 col desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Company name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Mumbai, India"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Website</label>
                <input
                  type="url"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://yourcompany.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Company Logo</label>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />
              </div>

            </div>

            {/* Description - full width */}
            <div>
              <label className={labelClass}>Company Description</label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief description of your company..."
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/admin/companies")}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
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
                    Updating...
                  </div>
                ) : (
                  "Update Company"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;