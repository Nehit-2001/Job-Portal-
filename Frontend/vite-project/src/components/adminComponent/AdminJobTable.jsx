import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Eye, Pencil, Briefcase, CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector(
    (store) => store.job
  );
  const navigate = useNavigate();
  const [filterAdminJobs, setFilterAdminJobs] = useState([]);

  useEffect(() => {
    if (!Array.isArray(allAdminJobs)) return;

    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      const jobTitle = job?.title?.toLowerCase() || "";
      const companyName = job?.company?.name?.toLowerCase() || "";
      const searchText = searchJobByText.toLowerCase();

      return jobTitle.includes(searchText) || companyName.includes(searchText);
    });

    setFilterAdminJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  // date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr.split("T")[0];
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* ── Desktop Table ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full">
          <caption className="caption-bottom text-xs text-gray-400 py-2 px-4 text-left">
            {filterAdminJobs.length} job{filterAdminJobs.length === 1 ? "" : "s"}{" "}
            posted
          </caption>
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Company
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Job Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Posted Date
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filterAdminJobs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-16">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Briefcase className="size-10 text-gray-300" />
                    <p className="text-sm font-medium">No jobs posted yet</p>
                    <p className="text-xs">
                      {searchJobByText
                        ? `No results for "${searchJobByText}"`
                        : "Create your first job posting to attract candidates"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filterAdminJobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {job?.company?.logo && (
                        <img
                          src={job.company.logo}
                          alt={job?.company?.name}
                          className="size-8 rounded-full object-cover ring-1 ring-gray-200"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-800">
                        {job?.company?.name || "Unknown Company"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-800">
                    {job?.title || "—"}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-gray-400" />
                      {formatDate(job?.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <ActionMenu
                      jobId={job._id}
                      onEdit={() => navigate(`/admin/companies/${job._id}`)}
                      onViewApplicants={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card View ── */}
      <div className="sm:hidden">
        {filterAdminJobs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-gray-400 px-4 text-center">
            <Briefcase className="size-10 text-gray-300" />
            <p className="text-sm font-medium">No jobs posted yet</p>
            <p className="text-xs">
              {searchJobByText
                ? `No results for "${searchJobByText}"`
                : "Create your first job posting to attract candidates"}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filterAdminJobs.map((job) => (
              <li
                key={job._id}
                className="flex items-start justify-between gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {job?.company?.logo && (
                      <img
                        src={job.company.logo}
                        alt={job?.company?.name}
                        className="size-7 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                      />
                    )}
                    <p className="text-xs font-medium text-gray-500 truncate">
                      {job?.company?.name || "Unknown Company"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 truncate mb-1">
                    {job?.title || "—"}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <CalendarDays className="size-3 shrink-0" />
                    {formatDate(job?.createdAt)}
                  </p>
                </div>
                <ActionMenu
                  jobId={job._id}
                  onEdit={() => navigate(`/admin/companies/${job._id}`)}
                  onViewApplicants={() =>
                    navigate(`/admin/jobs/${job._id}/applicants`)
                  }
                  isMobile
                />
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-gray-400 text-center py-2 border-t border-gray-100">
          {filterAdminJobs.length} job{filterAdminJobs.length === 1 ? "" : "s"}{" "}
          posted
        </p>
      </div>
    </div>
  );
};

// ── Reusable Action Menu ──
const ActionMenu = ({ jobId, onEdit, onViewApplicants, isMobile }) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 cursor-pointer shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
      </svg>
    </MenuButton>

    <MenuItems className={`absolute z-50 mt-1 w-40 origin-top-right rounded-lg bg-white border border-gray-200 shadow-lg focus:outline-none ${isMobile ? "right-0" : "right-0"}`}>
      <div className="py-1">
        <MenuItem>
          {({ active }) => (
            <button
              onClick={onEdit}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors ${
                active ? "bg-gray-50 text-indigo-600" : ""
              }`}
            >
              <Pencil className="size-4" />
              Edit Job
            </button>
          )}
        </MenuItem>
        <div className="border-t border-gray-100" />
        <MenuItem>
          {({ active }) => (
            <button
              onClick={onViewApplicants}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors ${
                active ? "bg-gray-50 text-indigo-600" : ""
              }`}
            >
              <Eye className="size-4" />
              View Applicants
            </button>
          )}
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
);

export default AdminJobTable;
