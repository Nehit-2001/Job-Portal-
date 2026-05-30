import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import { setUser } from "../redux/authSlice";
import { X } from "lucide-react";

const EditProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "", 
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
    if (file) {
      showMessage("File selected: " + file.name, "success");
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("phone", input.phone); 
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);
      if (input.file) formData.append("file", input.file);

      const res = await fetch(`${USER_API_ENDPOINT}/profile/update`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        showMessage(data.message || "Profile updated!", "success");
        setOpen(false);
      } else {
        showMessage(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelClass = "text-xs font-semibold text-gray-600 mb-1 block";

  return (
    <>
      {/* Toast Message */}
      {message.text && (
        <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-50 transition
          ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {message.text}
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4 z-999">
          <Dialog.Panel className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"> {/* ✅ responsive width */}

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Dialog.Title className="text-lg font-bold text-gray-800">
                Edit Profile
              </Dialog.Title>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid gap-4">

                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className={inputClass}
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    name="phone"
                    value={input.phone}
                    onChange={changeEventHandler}
                    className={inputClass}
                    placeholder="Phone number"
                    type="tel"
                  />
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    className={inputClass + " min-h-[80px] resize-none"}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className={labelClass}>Skills <span className="text-gray-400 font-normal">(comma separated)</span></label>
                  <input
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className={inputClass}
                    placeholder="React, Node.js, MongoDB..."
                  />
                </div>

                <div>
                  <label className={labelClass}>Resume <span className="text-gray-400 font-normal">(PDF only)</span></label>
                  <input
                    type="file" 
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold transition
                    ${loading
                      ? "bg-gray-300 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>

              </div>
            </form>

          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default EditProfile;