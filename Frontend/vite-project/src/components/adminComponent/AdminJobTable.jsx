import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Eye, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const { companies, searchCompanybyText } = useSelector(
    (store) => store.company,
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterAdminJobs, setFilterAdminJobs] = useState(allAdminJobs);
  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterAdminJobs(filteredJob);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="border border-gray-200 rounded-md overflow-x-auto">
      <table className="min-w-full bg-white">
        <caption className="caption-bottom text-sm text-gray-500">
          Your recent Posted Jobs
        </caption>
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Company Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {filterAdminJobs.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-10 text-gray-400 text-sm"
              >
                No Jobs Added yet.
              </td>
            </tr>
          ) : (
            filterAdminJobs?.map((job, index) => (
              <tr key={job._id}>
                <td className="px-6 py-3 text-left text-sm relative">
                  {job?.company?.name}
                </td>
                <td className="px-6 py-3 text-left text-sm relative">
                  {job?.title}
                </td>
                <td className="px-6 py-3 text-left text-sm relative">
                  {job.createdAt.split("T")[0]}
                </td>
                <td className="px-6 py-3 text-right text-sm relative">
                  <Menu as={"div"} className="relative inline-block">
                    <MenuButton className="font-semibold text-lg cursor-pointer">
                      ⋮
                    </MenuButton>

                    {/* DropDown */}
                    <MenuItems
                      as="div"
                      className="absolute right-2 top-4 z-50 w-25 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none"
                    >
                      <MenuItem>
                        <button
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex gap-2 cursor-pointer text-md p-1"
                        >
                          ✏️ <span>Edit</span>
                        </button>
                      </MenuItem>
                      <hr />
                      <MenuItem>
                        <button
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center justify-center gap-2 cursor-pointer text-md p-1"
                        >
                          <Eye className="size-4"></Eye>
                           <span className="w-fit">Applicants</span>
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobTable;
