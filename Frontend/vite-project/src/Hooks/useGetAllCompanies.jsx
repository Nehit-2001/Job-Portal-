import React from "react";
import { useEffect } from "react";
import { COMPANY_API_ENDPOINT } from "../utils/data";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";

const useGetAllCompanies = () => {
   const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`${COMPANY_API_ENDPOINT}/get`, {
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
          dispatch(setCompanies(data.companies));
        } else {
          console.error("Failed:", data?.message ?? "Unknown error");
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchCompany();
  }, []);
}

export default useGetAllCompanies
