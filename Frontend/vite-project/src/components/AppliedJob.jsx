import React from "react";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../Hooks/useGetAppliedJobs";

const AppliedJob = () => {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs);
  return (
    <div className="max-w-4xl mx-auto mt-5 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Company
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {allAppliedJobs?.length <= 0 ? (
              <span>You have not applied any job yet.</span>
            ) : (
              allAppliedJobs.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {item?.createdAt?.split("T")[0]}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {item?.job?.title}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {item?.job?.company?.name}
                  </td>

                  <td className="px-2 py-2 text-sm text-right text-gray-500">
                    <span className="inline-flex items-center gap-2 px-3 py-0.5 rounded-xl border border-slate-700 bg-[#20242f] text-white shadow-md w-fit">
                      <span className={`w-2 h-2 rounded-full mt-0.5 justify-center text-sm ${item?.status === 'rejected' ? 'bg-red-500' : item?.status === 'accepted' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      {item?.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJob;
