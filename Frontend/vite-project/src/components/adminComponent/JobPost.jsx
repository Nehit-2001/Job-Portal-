import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronsUpDown } from "lucide-react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  //   const [selected, setSelected] = useState(people[3]);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    position: 0,
    requirements: "",
    experience: "",
    jobType: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //Company Handle Change
  const companyHandleChange = (company) => {
    setSelected(company);
    setInput({ ...input, companyId: company._id });
  };

  //Taking Input values
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => {
      company.name.toLowerCase() === value;
    });
  };

  //submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    // console.log("Selected Company:", selected);
    try {
      setLoading(true);
      const res = await fetch(`${JOB_API_ENDPOINT}/post`, {
        method: "POST",
        credentials: "include", //include for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input)
      });

      const data = await res.json();
      console.log(data);

      if (res?.ok && data?.success) {
        alert(data.message);
        navigate("/admin/jobs");
      } else {
        console.error(data.message || "Something went wrong");
        navigate("/admin/jobs");
      }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-6 max-w-4xl border border-gray-400 rounded shadow-sm hover:shadow-xl hover:shadow-red-200"
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="grid ">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Title
              </label>
              <input
                value={input.title}
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter job title"
                name="title"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500 pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Description
              </label>
              <input
                value={input.description}
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter job description"
                name="description"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Location
              </label>
              <input
                value={input.location}
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter job location"
                name="location"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Salary
              </label>
              <input
                value={input.salary}
                onChange={changeEventHandler}
                type="number"
                placeholder="Enter salary"
                name="salary"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Position
              </label>
              <input
                value={input.position}
                onChange={changeEventHandler}
                type="number"
                placeholder="Enter job position"
                name="position"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Requirements
              </label>
              <input
                value={input.requirements}
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter job requirements"
                name="requirements"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Experience
              </label>
              <input
                value={input.experience}
                onChange={changeEventHandler}
                type="numer"
                placeholder="Enter job experience"
                name="experience"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
            <div className="grid">
              <label htmlFor="" className="text-gray-900 font-medium text-sm/6">
                Job Type
              </label>
              <input
                value={input.jobType}
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter job Job Type"
                name="jobType"
                className="focus-visible:ring-offset-0 shadow focus-visible:ring-0 my-1 border border-gray-400 rounded hover:shadow-blue-500  pl-1"
              />
            </div>
          </div>

          <div>
            <Listbox
              value={selected}
              onChange={(e) => {
                (companyHandleChange(e), selectChangeHandler(e));
              }}
            >
              <Label className="block text-sm/6 mt-2 font-medium text-gray-900">
                Choose Company
              </Label>
              <div className="relative mt-2">
                <ListboxButton className="grid cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    {selected && (
                      <img
                        src={selected.logo}
                        alt=""
                        className="size-5 rounded-full"
                      />
                    )}

                    <span className="block truncate">
                      {selected ? selected.name : "Select Company"}
                    </span>
                  </span>
                  <ChevronsUpDown
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-0.5 max-h-25 overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  {companies.map((company) => (
                    <ListboxOption
                      key={company._id}
                      value={company}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={company.logo}
                          className="size-5 shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                          {company.name}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div className="flex items-center justify-center my-3">
            <button
              type="submit"
              className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 border border-blue-500 hover:border-transparent rounded"
            >
              {loading ? "loading" : "Post Job"}
            </button>
          </div>
          <div>
            {companies.length === 0 && (
              <p className="text-center my-1 text-red-400 font-semibold">
                *Please register company before posting job.*
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPost;
