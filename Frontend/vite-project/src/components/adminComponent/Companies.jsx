import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ComapniesTable from "./ComapniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../Hooks/useGetAllCompanies.jsx";
import { useDispatch } from "react-redux";
import { setSearchCompanybyText } from "../../redux/companySlice";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(setSearchCompanybyText(input));
    }, [input]);
  return (
    <div className="">
      <Navbar />
      <div className="">
        <div className="max-w-5xl mx-auto my-10">
          <div className="flex items-center justify-between my-2">
            <input
              type="text"
              placeholder="Filter by Name"
              className="border border-gray-600s"
              onChange={(e)=> setInput(e.target.value)}
            />
            <button className="border p-1 rounded bg-gray-600 text-white font-semibold text-sm hover:bg-gray-50 hover:text-black" onClick={()=> navigate("/admin/companies/create")}>
              Add Company
            </button>
          </div>
          <div>
            <ComapniesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
