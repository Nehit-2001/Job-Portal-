import React, { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../utils/data";
import { useDispatch } from "react-redux";
import { setAlladminJobs } from "../redux/jobSlice";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await fetch(`${JOB_API_ENDPOINT}/getadminjobs`, {
          method: "GET",
          credentials: "include", // important for cookies
        });

        if (!res.ok) {
          console.error("Status:", res.status);
          return;
        }

        const data = await res.json();
        // console.log(data);

        if (res.ok && data.success) {
          dispatch(setAlladminJobs(data.jobs));
        } else {
          console.error("Failed:", data?.message ?? "Unknown error");
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
}

export default useGetAllAdminJobs;
