import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  const showAlert = () => {
    setLogout(true);
    setTimeout(() => {
      setLogout(false);
    }, 1000);
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        setLogout(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Logout Message UI */}
      {logout && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded z-50">
          {"Logout Succeccfully"}
        </div>
      )}
      <div className="flex items-center justify-between mx-auto max-w-6xl h-15">
        {/* left part */}
        <div>
          <h1 className="text-2xl font-bold cursor-pointer text-[#141c28de]">
            Job <span className="text-[#2777e7de]">Portal</span>
          </h1>
        </div>

        {/* right part */}
        <div className="flex gap-8 items-center rounded-2xl">
          <ul className="flex gap-7 font-medium items-center text-[#141c28de]">
            {user && user.role === "Recruiter" ? (
              <>
                <Link to={"/admin/companies"} className="cursor-pointer">
                  Companies
                </Link>
                <Link to={"/admin/jobs"} className="cursor-pointer">
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to={"/"} className="cursor-pointer">
                  Home
                </Link>
                <Link to={"/browse"} className="cursor-pointer">
                  Browse
                </Link>
                <Link to={"/jobs"} className="cursor-pointer">
                  Job
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex cursor-pointer gap-2">
              <Link to={"/login"}>
                <button className="text-gray-800 font-medium py-2 px-4 rounded-l hover:bg-gray-300 rounded">
                  LogIn
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="bg-red-400 font-medium py-2 px-2 hover:bg-red-500 rounded">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <Menu as="div" className="relative inline-block">
              <MenuButton className="flex items-center gap-1 cursor-pointer">
                <img
                  alt="img_loading.."
                  src={user?.profile?.profilePhoto}
                  className="size-8 rounded-full ring-2 ring-white"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg">
                <div className="py-1">
                  <MenuItem>
                    <div className="flex gap-2 px-3 py-2 cursor-pointer">
                      <img
                        alt="img_loading.."
                        src={user?.profile?.profilePhoto}
                        className="size-8 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-xs text-gray-700">
                          {user?.fullname}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                  </MenuItem>

                  {user && user.role === "Student" && (
                    <MenuItem>
                      <Link to={"/profile"}>
                        <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <User2></User2>
                          Profile
                        </button>
                      </Link>
                    </MenuItem>
                  )}

                  <MenuItem>
                    <button
                      onClick={() => {
                        (logoutHandler(), showAlert());
                      }}
                      className="flex gap-3 items-center w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogOut></LogOut>
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
