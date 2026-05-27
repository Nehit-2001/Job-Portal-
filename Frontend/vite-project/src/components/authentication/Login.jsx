import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import store from "../../redux/store";

const Login = () => {
  //useState for radio button
  const [role, setRole] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${USER_API_ENDPOINT}/login`, {
        method: "POST",
        credentials: "include", // same as axios withCredentials: true
        headers: {
          "Content-Type": "application/json", // needed for JSON data
        },
        body: JSON.stringify(input), // stringify plain object
      });

      const data = await res.json();

      if (res.ok && data.success) {
        dispatch(setUser(data.user));
        console.log(data.user);
        navigate("/");
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

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[]);
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
            Login
          </h1>
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
            <label>Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="enter your password"
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

          {loading ? (
            <div className="flex items-center justify-center my-10">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button className="w-full block bg-[#2777e7de] hover:bg-blue-600 text-white font-bold py-2 px-4 my-3 rounded-full">
              Login
            </button>
          )}

          {/* Alrady have an account */}
          <p className="text-gray-500 text-sm my-3 flex items-center justify-center">
            Don't have an account?
            <Link
              to={"/register"}
              className="mx-1 font-semibold text-blue-400 hover:text-[#0647a1]"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
