import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "../../Hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(setSearchJobByText(input));
    }, [input]);
  return (
    <div className="">
      <Navbar />
      <div className="">
        <div className="max-w-5xl mx-auto my-10">
          <div className="flex items-center justify-between my-2">
            <input
              type="text"
              placeholder="Filter by Name, Jobs"
              className="border border-gray-600s"
              onChange={(e)=> setInput(e.target.value)}
            />
            <button className="border p-1 rounded bg-gray-600 text-white font-semibold text-sm hover:bg-gray-50 hover:text-black" onClick={()=> navigate("/admin/job/create")}>
              Post New Job
            </button>
          </div>
          <div>
            <AdminJobTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
