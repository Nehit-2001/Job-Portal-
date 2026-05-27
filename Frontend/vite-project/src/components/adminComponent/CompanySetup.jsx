import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ArrowLeft } from "lucide-react";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../Hooks/useGetCompanyById";
import { Parallax } from "swiper/modules";

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    console.log(input);

    try {
      setLoading(true);
      const res = await fetch(`${COMPANY_API_ENDPOINT}/update/${params.id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok && data.success) {
        alert(data.message);
        navigate("/admin/companies");
      } else {
        alert(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-1 text-gray-600 text-xl font-semibold border p-1"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-blue-600">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 my-5 p-1">
            <div>
              <label htmlFor="" className="font-semibold">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="border rounded"
              />
            </div>
            <div className="ml-25">
              <label htmlFor="" className="font-semibold">
                Company Description
              </label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="border rounded"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold">
                Company Website
              </label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="border rounded"
              />
            </div>
            <div className="ml-25">
              <label htmlFor="" className="font-semibold">
                Company Location
              </label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="border rounded"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold">
                Company Logo
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="border rounded w-50"
              />
            </div>
          </div>
          <button type="submit" className="w-full mt-5 border rounded">
            {loading ? "loading" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
