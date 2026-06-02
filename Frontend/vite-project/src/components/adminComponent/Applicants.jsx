import Navbar from "../Navbar";
import ApplicantsTable from "./ApplicantsTable";
import React, { useEffect, useState } from "react";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleApplication } from "../../redux/applicationSlice";
import { Users, AlertCircle } from "lucide-react";

const Applicants = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build the correct API endpoint
        const apiUrl = `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`;
        console.log("Fetching from:", apiUrl);

        const res = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if response is OK
        if (!res.ok) {
          const contentType = res.headers.get("content-type");
          let errorData;

          // Try to parse as JSON if possible
          if (contentType?.includes("application/json")) {
            errorData = await res.json();
            throw new Error(
              errorData?.message || `Server error: ${res.status} ${res.statusText}`
            );
          } else {
            // Response is not JSON (HTML error page)
            throw new Error(
              `Server returned ${res.status} ${res.statusText}. Check your API endpoint.`
            );
          }
        }

        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error(
            "API returned invalid response format. Expected JSON."
          );
        }

        // Parse JSON
        const data = await res.json();

        if (data?.success) {
          dispatch(setSingleApplication(data.job));
        } else {
          setError(data?.message || "Failed to fetch applicants");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          error.message || "Something went wrong while fetching applicants"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAllApplicants();
    } else {
      setError("No job ID provided");
      setLoading(false);
    }
  }, [params.id, dispatch]);

  const applicantCount = applicants?.application?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-[#141c28de]">
              Applicants
              <span className="ml-2 text-base font-normal text-gray-400">
                ({applicantCount})
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Review and manage job applicants</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Loading applicants...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <AlertCircle size={24} className="text-red-500" />
              <h3 className="font-semibold text-red-800">Error loading applicants</h3>
            </div>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <div className="bg-red-100 rounded-lg p-3 text-left text-xs text-red-700 font-mono">
              <p className="font-semibold mb-1">Troubleshooting:</p>
              <ul className="space-y-1">
                <li>✓ Check that APPLICATION_API_ENDPOINT is correctly set</li>
                <li>✓ Verify the job ID exists: <strong>{params.id}</strong></li>
                <li>✓ Ensure your backend API has the endpoint:</li>
                <li className="ml-4 mt-1">
                  <code>GET {APPLICATION_API_ENDPOINT}/{"{"}params.id{"}"}/applicants</code>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && applicantCount === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Users size={40} className="mb-3 opacity-30" />
            <p className="text-lg font-medium">No applicants yet</p>
            <p className="text-sm mt-1">Applicants will appear here once they apply</p>
          </div>
        )}

        {/* Applicants Table */}
        {!loading && !error && applicantCount > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ApplicantsTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;