import React, { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store)=> store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {
          method: "GET",
          credentials: "include", // important for cookies
        });

        if (!res.ok) {
          console.error("Status:", res.status);
          return;
        }

        const data = await res.json();
        console.log(data);

        if (res.ok && data.success) {
          dispatch(setAllJobs(data.jobs));
        } else {
          console.error("Failed:", data?.message ?? "Unknown error");
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);
}

export default useGetAllJobs;
