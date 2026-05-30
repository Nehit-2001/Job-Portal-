import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [toast, setToast] = useState({ text: "", type: "" });

  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToast = (text, type = "error") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3000);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) return showToast("Please select a role", "error"); 

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await fetch(`${USER_API_ENDPOINT}/register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || "Registered successfully!", "success");
        setTimeout(() => navigate("/login"), 1500); 
      } else {
        showToast(data?.message || "Something went wrong", "error");
      }
    } catch (error) {
      showToast(error.message || "Something went wrong", "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/"); 
  }, [user, navigate]); 

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toast */}
      {toast.text && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.text}
        </div>
      )}

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8"> 

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl md:text-3xl text-[#2777e7de]">Create Account</h1>
            <p className="text-gray-400 text-sm mt-1">Join us and find your dream job</p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Your full name"
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="10-digit phone number"
                maxLength={10}
                minLength={10}
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Min 8 characters"
                minLength={8}
                maxLength={16} 
                required
                className={inputClass}
              />
            </div>

            {/* Role */}
            <div>
              <label className={labelClass}>Register as</label>
              <div className="flex gap-4 mt-1">
                {["Student", "Recruiter"].map((r) => (
                  <label
                    key={r}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border cursor-pointer transition text-sm font-medium
                      ${input.role === r
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={input.role === r}
                      onChange={changeEventHandler}
                      className="hidden"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className={labelClass}>Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading} 
              className={`w-full py-2.5 rounded-xl text-white font-semibold text-sm transition mt-2
                ${loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#2777e7de] hover:bg-blue-600 cursor-pointer"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Registering...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-gray-500 text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-700 transition">
                Login here
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
