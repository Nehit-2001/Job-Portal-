import React, { useEffect } from "react";
import { COMPANY_API_ENDPOINT } from "../utils/data";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await fetch(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
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
          dispatch(setSingleCompany(data.company));
        } else {
          console.error("Failed:", data?.message ?? "Unknown error");
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
}

export default useGetCompanyById

