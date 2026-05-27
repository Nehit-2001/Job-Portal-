import React, { use, useState } from "react";
import Navbar from "./Navbar";
import { Menu, MenuButton, MenuItem } from "@headlessui/react";
import { Badge, Divide, Mail, Pencil, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import AppliedJob from "./AppliedJob";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import store from "../redux/store";
import useGetAppliedJobs from "../Hooks/useGetAppliedJobs";


const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;

  const {user} = useSelector((store)=> store.auth);

  const [open, setOpen] = useState(false);
  const openEditButton = ()=> {
    setOpen(true)
    // console.log(open);
  }
  return (
    <div className="">
      <Navbar />

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto border border-gray-300 bg-white rounded-2xl shadow-sm shadow-red-400 my-5 p-5 hover:shadow-yellow-300">
        <div className="flex items-center">
          <div className="w-[10%]">
            <Menu as="div" className="relative inline-block">
              <MenuButton className="flex items-center gap-1 cursor-pointer">
                <img
                  src={user?.profile?.profilePhoto}
                  alt=""
                  className="size-20 rounded-full ring-5 ring-white"
                />
              </MenuButton>
            </Menu>
          </div>
          <div className="w-[90%] mx-2">
            <h1 className="font-bold text-gray-600 text-2xl">{user?.fullname}</h1>
            <p className="text-gray-500 text-sm">
              {user?.profile?.bio}
            </p>
          </div>
          <div>
            <div className="flex">
              <button onClick={()=> setOpen(true)} className="flex items-center gap-2 px-2 py-1 border border-gray-300 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                <Pencil size={15} className="mt-0.5" />
              </button>
            </div>
          </div>
        </div>
        <div className="gap-2 text-sm text-gray-500 my-3">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="text-gray-500 text-sm"></Mail>
            <span>
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-gray-500 text-sm"></Phone>
            <span>
              <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
            </span>
          </div>
        </div>

        {/* Skills section */}
        <div>
          <div className="my-4">
            <h1 className="font-semibold text-2xl">Skills</h1>
            <div className="flex items-center gap-2 my-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <div>
                    <span class="flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                      {item}
                    </span>
                  </div>
                ))
              ) : (
                <span class="flex items-center cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                  Add Skills
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Resume section */}
        <div>
          <div className="grid w-full max-w-sm items-center">
            <h1 className="font-semibold">Resume</h1>
            <div className="flex items-center my-2">
              {isResume ? (
                <div>
                  <Link to={user?.profile?.resume} target="_blank">
                    <span class="flex items-center text-sm cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">
                      Download
                    </span>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link>
                    <span class="flex items-center cursor-pointer rounded-md bg-gray-700 px-2 py-1 text-sm font-medium text-white inset-ring inset-ring-gray-500/10">
                      Add Resume
                    </span>
                    
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
        {/* Applied Job table */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-semibold text-md">Applied Job</h1>
            {/* Job table */}
            <AppliedJob/>
        </div>

        {/* Edit Profile */}
        <div>
          <EditProfile open={open} setOpen={setOpen}/>
        </div>
    </div>
  );
};

export default Profile;
