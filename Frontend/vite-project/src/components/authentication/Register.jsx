import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../../utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Register = () => {
  //useState for radio button
  const [role, setRole] = useState("");
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const {user} = useSelector((store)=> store.auth);

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${USER_API_ENDPOINT}/register`, {
        method: "POST",
        credentials: "include", // same as axios withCredentials: true
        body: formData, // if formData is FormData object (file upload)
        // ✅ Don't add Content-Type header when sending FormData
        // browser will automatically set it with boundary
      });
      console.log(`${USER_API_ENDPOINT}/register`);
      

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert(error.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=> {
    if(user){
      console.log("You can't register until logout");
      navigate("/");
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-6xl my-7 mx-auto">
        {/* Register Form  */}
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-800 rounded-md p-4 my-8"
        >
          <h1 className="font-bold text-3xl text-[#2777e7de] text-center">
            Register
          </h1>
          <div className="my-2 flex flex-col gap-1">
            <label>Full Name</label>
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="enter your name"
              className="border border-amber-200 rounded-md"
            />
          </div>
          <div className="my-2 flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="enter your email"
              className="border border-amber-200 rounded-md"
            />
          </div>
          <div className="my-2 flex flex-col gap-1">
            <label>Phone Number</label>
            <input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="enter your number"
              maxLength={"10"}
              minLength={"10"}
              className="border border-amber-200 rounded-md"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label>Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="enter your password"
              minLength={"8"}
              maxLength={"8"}
              className="border border-amber-200 rounded-md"
            />
          </div>

          {/* Radio Buttons */}
          <div className="flex justify-around items-center mt-5 gap-5">
            <label htmlFor="" className="flex items-center gap-2">
              <input
                className="cursor-pointer"
                type="radio"
                name="role"
                value="Student"
                checked={input.role === "Student"}
                onChange={(e) => {
                  setRole(e.target.value);
                  changeEventHandler(e);
                }}
              />
              <span className="mb-1 font-semibold text-lg">Student</span>
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input
                className="cursor-pointer"
                type="radio"
                name="role"
                value="Recruiter"
                checked={input.role === "Recruiter"}
                onChange={(e) => {
                  setRole(e.target.value);
                  changeEventHandler(e);
                }}
              />
              <span className="mb-1 font-semibold text-lg">Recruiter</span>
            </label>
          </div>
          <div className="flex items-center gap-2 my-2 overflow-auto">
            <label htmlFor="" className="">
              Profile Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer border rounded-2xl p-1"
              onChange={changeFileHandler}
            />
          </div>
          {loading ? (
            // <div className="flex items-center justify-center my-10">
            //   <div className="spinner-border text-blue-600" role="status">
            //     <span className="sr-only">Loading...</span>
            //   </div>
            // </div>
            <button
              type="submit"
              className="w-full block disabled: bg-[#2777e7de] hover:bg-blue-600 text-white font-bold py-2 px-4 my-3 rounded-full"
            >
              Loading....
            </button>
          ) : (
            <button
              type="submit"
              className="w-full block bg-[#2777e7de] hover:bg-blue-600 text-white font-bold py-2 px-4 my-3 rounded-full"
            >
              Register
            </button>
          )}

          {/* Alrady have an account */}
          <p className="text-gray-500 text-sm my-3 flex items-center justify-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="mx-1 font-semibold text-blue-400 hover:text-[#0647a1]"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
export const register = async (req, res) => {
    console.log("Register route hit!"); // ← add this
    console.log("Body:", req.body);     // ← add this
    console.log("File:", req.file);     // ← add this
}
