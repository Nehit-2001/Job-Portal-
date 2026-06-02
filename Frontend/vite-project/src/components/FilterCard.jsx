import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "New York",
      "London",
      "Tokyo",
      "Paris",
      "Berlin",
      "Sydney",
      "Toronto",
      "Dubai",
      "Singapore",
      "Mumbai",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Redux",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Git",
      "GitHub",
      "TypeScript",
      "Next.js",
      "Bootstrap",
      "Material UI",
      "REST API",
      "JWT",
      "Socket.io",
      "Cloudinary",
    ],
  },
  {
    filterType: "Experience",
    array: [
      "Fresher",
      "0-1 years",
      "1-3 years",
      "3-5 years",
      "5-7 years",
      "7-10 years",
      "10+ years",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "3",
      "6",
      "10",
      "15",
      "20",
      "30",
      "30+",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [openSections, setOpenSections] = useState(
    filterData.map(() => true), // ✅ all sections open by default
  );
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleReset = () => {
    setSelectedValue(""); // ✅ reset selection
    dispatch(setSearchedQuery(""));
  };

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === index ? !open : open)),
    );
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]); // added dispatch to deps

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-base text-[#141c28de]">Filter Jobs</h1>
        {selectedValue && ( // only show reset when something is selected
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>

      {/* Active Filter Badge */}
      {selectedValue && (
        <div className="mb-3 px-2 py-1 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
          <span className="text-xs text-blue-700 font-medium truncate">
            {selectedValue}
          </span>
          <button
            onClick={handleReset}
            className="ml-2 text-blue-400 hover:text-blue-600"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <hr className="mb-3" />

      {/* Filter Sections */}
      <div className="flex flex-col gap-2">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="border-b border-gray-50 pb-2 last:border-0"
          >
            {/* Section Header - Collapsible */}
            <button
              onClick={() => toggleSection(index)}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <h2 className="font-semibold text-sm text-[#141c28de]">
                
                {data.filterType === "Salary" ? (
                  <p>Salary <span className="text-xs text-[#929394de]">(in LPA)</span></p>
                ) : (
                  <p>{data.filterType}</p>
                )}
              </h2>
              {openSections[index] ? (
                <ChevronUp size={14} className="text-gray-400" />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>

            {/* Section Items */}
            {openSections[index] && (
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1 pr-1">
                {" "}
                {/* scrollable */}
                {data.array.map((item, idx) => (
                  <label
                    key={idx}
                    htmlFor={`${data.filterType}-${item}`}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition
                      ${
                        selectedValue === item
                          ? "bg-blue-50 text-blue-700 font-medium" // highlight selected
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                  >
                    <input
                      type="radio"
                      id={`${data.filterType}-${item}`}
                      name={data.filterType}
                      value={item}
                      checked={selectedValue === item}
                      onChange={(e) => handleChange(e.target.value)}
                      className="accent-blue-600 cursor-pointer"
                    />
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
