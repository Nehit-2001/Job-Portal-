import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ComapniesTable = () => {
  const { companies, searchCompanybyText } = useSelector(
    (store) => store.company,
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanybyText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanybyText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanybyText]);
  return (
    <div className="border border-gray-200 rounded-md overflow-x-auto">
      <table className="min-w-full bg-white">
        <caption className="caption-bottom text-sm">
          Your recent registered companies
        </caption>
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Logo
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Company Name
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
          {filterCompany.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-10 text-gray-400 text-sm"
              >
                No Jobs Added yet.
              </td>
            </tr>
          ) : (
            filterCompany.map((company, index) => (
              <tr key={company._id}>
                <td className="px-6 py-3 text-left text-sm relative">
                  <img
                    src={company.logo || "Loding_img"}
                    alt={`${company.name} logo`}
                    className="size-8 rounded-full ring-2 ring-white"
                  />
                </td>
                <td className="px-6 py-3 text-left text-sm relative">
                  {company.name}
                </td>
                <td className="px-6 py-3 text-left text-sm relative">
                  {company.createdAt.split("T")[0]}
                </td>
                <td className="px-6 py-3 text-right text-sm relative">
                  <Menu as={"div"} className="relative inline-block">
                    <MenuButton className="font-semibold text-lg cursor-pointer">
                      ⋮
                    </MenuButton>

                    {/* DropDown */}
                    <MenuItems
                      as="div"
                      className="absolute right-2 top-4 z-50 w-17 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none"
                    >
                      <MenuItem>
                        <button
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex gap-3 cursor-pointer text-md p-1"
                        >
                          ✏️ <span>Edit</span>
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

export default ComapniesTable;
