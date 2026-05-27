import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import { setUser } from "../redux/authSlice";

const EditProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  // handle text input
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // handle file input
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });

    if (file) {
      setMessage("File selected");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // submit form using fetch
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("phone", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await fetch(
        `${USER_API_ENDPOINT}/profile/update`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        setMessage(data.message || "Profile updated!");
        setOpen(false);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
    console.log(input);
  };

  return (
    <>
      {/* Message UI */}
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded z-50">
          {message}
        </div>
      )}

      <Dialog open={open} onClose={setOpen} className="relative z-40">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" />

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-100 w-[50%] max-h-[80vh] overflow-y-auto p-6 rounded relative">

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ×
            </button>

            <Dialog.Title className="text-2xl font-semibold mb-4">
              Edit Profile
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-3">

                <input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="border p-2 rounded"
                  placeholder="Name"
                />

                <input
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="border p-2 rounded"
                  placeholder="Email"
                />

                <input
                  name="phone"
                  value={input.phone}
                  onChange={changeEventHandler}
                  className="border p-2 rounded"
                  placeholder="Phone"
                />

                <textarea
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="border p-2 rounded min-h-[100px]"
                  placeholder="Bio"
                />

                <input
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="border p-2 rounded"
                  placeholder="Skills (comma separated)"
                />

                <input
                className=""
                  type="file"
                  placeholder="enter your name"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="border p-2 rounded"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`p-2 rounded text-white ${
                    loading ? "bg-gray-400 disabled:" : "bg-blue-500"
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