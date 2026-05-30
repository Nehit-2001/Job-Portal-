import React, { useState } from "react";
import Navbar from "./Navbar";
import { Mail, Pencil, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import AppliedJob from "./AppliedJob";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../Hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const isResume = !!user?.profile?.resume;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {/* Top Row */}
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <img
                src={user?.profile?.profilePhoto}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-gray-800 text-xl md:text-2xl truncate">
                {user?.fullname}
              </h1>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                {user?.profile?.bio || "No bio added yet"}
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="shrink-0 flex items-center gap-2 px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-600"
            >
              <Pencil size={14} />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5 text-sm text-gray-500">
            
             <a href={"mailto:" + user?.email}
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <Mail size={15} className="shrink-0" />
              <span className="truncate">{user?.email}</span>
            </a>
            <a
              href={"tel:" + user?.phoneNumber}
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <Phone size={15} className="shrink-0" />
              <span>{user?.phoneNumber}</span>
            </a>
          </div>

          <hr className="my-5" />

          {/* Skills */}
          <div>
            <h2 className="font-semibold text-base text-gray-800 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 border border-dashed border-gray-300 hover:bg-gray-200 transition"
                >
                  + Add Skills
                </button>
              )}
            </div>
          </div>

          <hr className="my-5" />

          {/* Resume */}
          <div>
            <h2 className="font-semibold text-base text-gray-800 mb-3">Resume</h2>
            {isResume ? (
              <Link
                to={user?.profile?.resume}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition"
              >
                View / Download Resume
              </Link>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                + Upload Resume
              </button>
            )}
          </div>

        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-base text-gray-800 mb-4">Applied Jobs</h2>
          <AppliedJob />
        </div>

      </div>

      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;