import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((store) => store.auth);
console.log("user:", user); // ← is user null?
console.log("token:", document.cookie); // ← is cookie present?

  const registerNewCompany = async () => {
    try {
      const res = await fetch(`${COMPANY_API_ENDPOINT}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, description }),
      });

      const data = await res.json();
      console.log(data);

      if (res?.ok && data?.success) {
        // handle success
        dispatch(setSingleCompany(data?.company));
        alert(data.message);
        const companyId = data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        console.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-semibold text-2xl">Company Name</h1>
          <p className="text-gray-500 font-medium">Company Description</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-semibold text-xl">
            Company Name
          </label>
          <input
            type="text"
            placeholder="company name"
            className="my-2 border rounded p-1"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="company description"
            className="my-2 border rounded p-1"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center my-4">
          <button
            className="inline-flex items-center rounded-md bg-white px-3 py-1 text-xs font-medium text-black inset-ring inset-ring-gray-500/10 hover:bg-gray-600 hover:text-white cursor-pointer"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center rounded-md bg-gray-600 px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-gray-500/10 hover:text-black hover:bg-white cursor-pointer"
            onClick={registerNewCompany}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
