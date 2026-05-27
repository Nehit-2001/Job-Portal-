import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice"; // 👈 import your action

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
      "0 - 3 LPA",
      "3 - 6 LPA",
      "6 - 10 LPA",
      "10 - 15 LPA",
      "15 - 20 LPA",
      "20 - 30 LPA",
      "30+ LPA",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState(""); // ✅ fixed naming
  const dispatch = useDispatch(); // ✅ for global state

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue)); // ✅ dispatch to Redux so useGetAllJobs refetches
  }, [selectedValue]); // ✅ added dependency array

  return (
    <div className="w-full">
      <h1 className="mx-3 font-semibold text-lg">Filter Job</h1>
      <hr />

      <div>
        {filterData.map((data, index) => (
          <div key={index}>
            {" "}
            {/* ✅ key added */}
            <h2 className="font-semibold my-2 mx-3">{data.filterType}</h2>
            {data.array.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-2 text-sm items-center my-1 mx-3"
              >
                {" "}
                {/* ✅ key added */}
                <input
                  type="radio"
                  id={`${data.filterType}-${item}`} // ✅ unique id
                  name={data.filterType} // ✅ groups radios per filter type
                  value={item}
                  checked={selectedValue === item} // ✅ controlled input
                  onChange={(e) => handleChange(e.target.value)} // ✅ moved here
                  className="accent-black cursor-pointer"
                />
                <label
                  htmlFor={`${data.filterType}-${item}`} // ✅ linked to input
                  className="cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
