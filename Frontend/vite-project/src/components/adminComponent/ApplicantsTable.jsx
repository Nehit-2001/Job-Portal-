import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import React from "react";
import { useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";

const Status = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  
  const statusHandler = async (status, id) => {
    try {
      const res = await fetch(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        {
          method: "POST",
          credentials: "include",
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok && data.success) {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to update status", error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-x-auto">
      <table className="min-w-full bg-white">
        <caption className="caption-bottom text-sm text-gray-500">
          Your recent Posted Jobs
        </caption>
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Resume
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {applicants &&
            applicants?.application?.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="px-6 py-3 text-left text-sm relative">{item?.applicant?.fullname}</td>
                  <td className="px-6 py-3 text-left text-sm relative">{item?.applicant?.email}</td>
                  <td className="px-6 py-3 text-left text-sm relative">{item?.applicant?.phoneNumber}</td>
                  <td className="px-6 py-3 text-left text-sm relative">
                    {item?.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-400 cursor-pointer"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                      >
                        {item?.applicant?.profile?.resume}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right text-sm relative">
                    <Menu as={"div"} className="relative inline-block">
                      <MenuButton className="font-semibold text-lg cursor-pointer">
                        ⋮
                      </MenuButton>

                      {/* DropDown */}
                      <MenuItems
                        as="div"
                        className="absolute right-2 top-4 z-50 w-25 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none"
                      >
                        {Status.map((status, index) => {
                          return (
                            <span
                            onClick={()=> statusHandler(status, item?._id)}
                              key={index}
                              className="flex items-center m-0.4 p-0.4 gap-2"
                            >
                              <input
                                type="radio"
                                name="Status"
                                value={status}
                              />{" "}
                              {status}
                            </span>
                          );
                        })}
                      </MenuItems>
                    </Menu>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
