import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Building2, CalendarDays, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [], searchCompanybyText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    if (!Array.isArray(companies)) return;

    const filtered = companies.filter((company) => {
      if (!searchCompanybyText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanybyText.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [companies, searchCompanybyText]);

  // Safe date formatter
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

  // Fallback avatar with company initial
  const CompanyLogo = ({ src, name }) => {
    const [imgError, setImgError] = useState(false);
    const initial = name?.charAt(0)?.toUpperCase() || "?";

    if (!src || imgError) {
      return (
        <div className="size-9 rounded-full ring-2 ring-indigo-100 bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-sm select-none">
          {initial}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={`${name} logo`}
        onError={() => setImgError(true)}
        className="size-9 rounded-full ring-2 ring-indigo-100 object-cover"
      />
    );
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* ── Desktop Table ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full">
          <caption className="caption-bottom text-xs text-gray-400 py-2 px-4 text-left">
            {filterCompany.length} compan{filterCompany.length === 1 ? "y" : "ies"} found
          </caption>
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Logo
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Company Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date Registered
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filterCompany.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-16">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Building2 className="size-10 text-gray-300" />
                    <p className="text-sm font-medium">No companies found</p>
                    <p className="text-xs">
                      {searchCompanybyText
                        ? `No results for "${searchCompanybyText}"`
                        : "Register your first company to get started"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filterCompany.map((company) => (
                <tr
                  key={company._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-5 py-3">
                    <CompanyLogo src={company.logo} name={company.name} />
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-800">
                    {company.name || "—"}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-gray-400" />
                      {formatDate(company.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <ActionMenu
                      onEdit={() => navigate(`/admin/companies/${company._id}`)}
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
        {filterCompany.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-gray-400 px-4 text-center">
            <Building2 className="size-10 text-gray-300" />
            <p className="text-sm font-medium">No companies found</p>
            <p className="text-xs">
              {searchCompanybyText
                ? `No results for "${searchCompanybyText}"`
                : "Register your first company to get started"}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filterCompany.map((company) => (
              <li
                key={company._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CompanyLogo src={company.logo} name={company.name} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {company.name || "—"}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <CalendarDays className="size-3 shrink-0" />
                      {formatDate(company.createdAt)}
                    </p>
                  </div>
                </div>
                <ActionMenu
                  onEdit={() => navigate(`/admin/companies/${company._id}`)}
                />
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-gray-400 text-center py-2 border-t border-gray-100">
          {filterCompany.length} compan{filterCompany.length === 1 ? "y" : "ies"} found
        </p>
      </div>
    </div>
  );
};

// ── Reusable Action Menu ──
const ActionMenu = ({ onEdit }) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 cursor-pointer">
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

    <MenuItems className="absolute right-0 z-50 mt-1 w-36 origin-top-right rounded-lg bg-white border border-gray-200 shadow-lg focus:outline-none">
      <div className="py-1">
        <MenuItem>
          {({ active }) => (
            <button
              onClick={onEdit}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors ${
                active ? "bg-gray-50 text-indigo-600" : ""
              }`}
            >
              <Pencil className="size-3.5" />
              Edit Company
            </button>
          )}
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
);

export default CompaniesTable;
