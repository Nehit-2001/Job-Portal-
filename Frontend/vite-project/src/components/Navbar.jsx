import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;   

  return (
    <div className="">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-15">
        {/* left part */}
        <div>
          <h1 className="text-2xl font-bold cursor-pointer">
            Job <span className="text-[#2777e7de]">Portal</span>
          </h1>
        </div>

        {/* right part */}
        <div className="flex gap-8 items-center rounded-2xl">
          <ul className="flex gap-7 font-medium items-center">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Browser</li>
            <li className="cursor-pointer">Job</li>
          </ul>
          {!user ? (
            <div className="flex cursor-pointer gap-2">
              <Link to={'/login'}>
              <button className="text-gray-800 font-medium py-2 px-4 rounded-l hover:bg-gray-300 rounded">
                LogIn
              </button>
              </Link>
              <Link to={'/register'}>
              <button className="bg-red-400 font-medium py-2 px-2 hover:bg-red-500 rounded">
                Register
              </button>
              </Link>
            </div>
          ) : (
            <Menu as="div" className="relative inline-block">
              <MenuButton className="flex items-center gap-1 cursor-pointer">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc"
                  className="size-8 rounded-full ring-2 ring-white"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg">
                <div className="py-1">
                  <MenuItem>
                    <div className="flex gap-2 px-3 py-2 cursor-pointer">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc"
                        className="size-8 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm text-gray-700">
                          Mohit negi
                        </h3>
                        <p className="text-xs text-gray-400">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eum, non?
                        </p>
                      </div>
                    </div>
                  </MenuItem>

                  <MenuItem>
                    <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <User2></User2>
                      Profile
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button className="flex gap-3 items-center w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer">
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
