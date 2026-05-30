import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [toast, setToast] = useState({ text: "", type: "" }); // ✅ toast instead of alert

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const showToast = (text, type = "error") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3000);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) return showToast("Please select a role", "error"); // ✅ validate role
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${USER_API_ENDPOINT}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        dispatch(setUser(data.user));
        navigate("/");
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
  }, [user, navigate]); // ✅ fixed deps

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ✅ Toast */}
      {toast.text && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.text}
        </div>
      )}

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8"> {/* ✅ responsive width */}

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl md:text-3xl text-[#2777e7de]">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-1">Login to your account</p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                required
                className={inputClass}
              />
            </div>

            {/* Role Radio Buttons */}
            <div>
              <label className={labelClass}>Login as</label>
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
                      className="hidden" // ✅ hidden, label acts as button
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
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
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {/* ✅ Tailwind spinner */}
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            {/* Register Link */}
            <p className="text-gray-500 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-700 transition">
                Register here
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;