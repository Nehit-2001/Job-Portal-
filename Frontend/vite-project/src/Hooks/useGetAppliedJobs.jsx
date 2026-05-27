import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_ENDPOINT } from '../utils/data';
import { setAllAppliedJobs } from '../redux/jobSlice';

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    const fetchAppliedJobs = async ()=> {
        try {
            const res = await fetch(`${APPLICATION_API_ENDPOINT}/get`, {
                credentials: 'include',
            });
            const data = await res.json();
            if(res.ok && data.success){
                dispatch(setAllAppliedJobs(data.applications));
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchAppliedJobs();
  }, [dispatch])
  return null;
}

export default useGetAppliedJobs;
