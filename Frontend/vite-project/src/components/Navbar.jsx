import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, User2, AlignRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ mobile menu state

  const showAlert = () => {
    setLogout(true);
    setTimeout(() => setLogout(false), 2000);
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }, // ✅ fixed - was in wrong place
      );
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        showAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks =
    user && user.role === "Recruiter" ? (
      <>
        <Link
          to="/admin/companies"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition"
        >
          Companies
        </Link>
        <Link
          to="/admin/jobs"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition"
        >
          Jobs
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link
          to="/browse"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition"
        >
          Browse
        </Link>
        <Link
          to="/jobs"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition"
        >
          Jobs
        </Link>
      </>
    );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* ✅ Logout Toast */}
      {logout && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg z-50 text-sm">
          Logged out successfully ✓
        </div>
      )}

      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-[#141c28de]">
            Job <span className="text-[#2777e7de]">Portal</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-7 font-medium text-[#141c28de]">
            {navLinks}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-600 text-white font-medium py-2 px-4 hover:bg-blue-700 rounded transition">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <Menu as="div" className="relative inline-block">
              <MenuButton className="flex items-center gap-1 cursor-pointer">
                <img
                  alt="profile"
                  src={user?.profile?.profilePhoto}
                  className="size-9 rounded-full ring-2 ring-blue-500 object-cover"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100">
                <div className="py-1">
                  {/* User Info */}
                  <MenuItem>
                    <div className="flex gap-3 px-4 py-3 border-b border-gray-100">
                      <img
                        alt="profile"
                        src={user?.profile?.profilePhoto}
                        className="size-9 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800">
                          {user?.fullname}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                  </MenuItem>

                  {/* Profile Link - Students only */}
                  {user?.role === "Student" && (
                    <MenuItem>
                      <Link to="/profile">
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                          <User2 size={16} />
                          Profile
                        </button>
                      </Link>
                    </MenuItem>
                  )}

                  {/* Logout */}
                  <MenuItem>
                    <button
                      onClick={() => {
                        logoutHandler();
                        showAlert();
                      }} // ✅ fixed comma operator bug
                      className="flex gap-3 items-center w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>

        {/* ✅ Mobile Right Side */}
        {/* ✅ Mobile Right Side */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Menu as="div" className="relative inline-block">
              <MenuButton className="flex items-center cursor-pointer">
                <img
                  alt="profile"
                  src={user?.profile?.profilePhoto}
                  className="size-8 rounded-full ring-2 ring-blue-500 object-cover"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100">
                <div className="py-1">
                  {/* User Info */}
                  <div className="flex gap-3 px-4 py-3 border-b border-gray-100">
                    <img
                      alt="profile"
                      src={user?.profile?.profilePhoto}
                      className="size-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        {user?.fullname}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  {/* Profile - Students only */}
                  {user?.role === "Student" && (
                    <MenuItem>
                      <Link to="/profile">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                          <User2 size={16} /> Profile
                        </button>
                      </Link>
                    </MenuItem>
                  )}

                  {/* Sign out */}
                  <MenuItem>
                    <button
                      onClick={() => {
                        logoutHandler();
                        showAlert();
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}

          {/* Hamburger - nav links only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700"
          >
            {menuOpen ? <X size={24} /> : <AlignRight size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 shadow-md">
          <ul className="flex flex-col gap-3 font-medium text-[#141c28de]">
            {navLinks}
          </ul>

          {/* Show login/register buttons only if not logged in */}
          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-gray-800 font-medium py-2 px-4 rounded border border-gray-200 hover:bg-gray-50 transition">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
