import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText:"",
    allAppliedJobs: [],
    searchedQuery : "",
}

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers: {
        setAllJobs: (state, action) => { //fetch all jobs
            state.allJobs = action.payload;
        },
        setSingleJob : (state, action)=> {   //fetch job details
            state.singleJob = action.payload
        },
        setAlladminJobs : (state, action)=> {  //fetch ALl Admin posted jobs
            state.allAdminJobs = action.payload
        },
        setSearchJobByText : (state, action)=> {  //fetch ALl Admin posted jobs
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs : (state, action)=> {
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery: (state, action)=> {
            state.searchedQuery = action.payload
        }
    }
})

export const {setAllJobs, setSingleJob, setAlladminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery} = jobSlice.actions;

export const jobSliceReducer = jobSlice.reducer;