import Navbar from '../Navbar'
import ApplicantsTable from './ApplicantsTable'
import React, { useEffect } from "react";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleApplication } from "../../redux/applicationSlice";

const Applicants = () => {
    const { applicants } = useSelector(
  (store) => store.application
);
      const dispatch = useDispatch();
      const params = useParams();
    //   console.log("JOB ID: ", params);
      useEffect(() => {
        const fetchAllApplicants = async () => {
            
          try {
            const res = await fetch(
              `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
              {
                method: "GET",
                credentials: "include",
              },
            );
            const data = await res.json();
            console.log(data);
    
            if (res?.ok && data?.success) {
              console.log("Fetching Data", data.job.application[0].applicant);
              dispatch(setSingleApplication(data.job));
            }
          } catch (error) {
            console.log(error);
          }
        };
        if(params.id){
            fetchAllApplicants();
        }
      }, []);
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto'>
        <h1 className='font-bold text-xl my-10'>Applicant ({applicants?.application?.length})</h1>
        <div>
            <ApplicantsTable/>
        </div>
      </div>
    </div>
  )
}

export default Applicants
