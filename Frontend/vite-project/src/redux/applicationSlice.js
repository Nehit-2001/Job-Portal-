import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState : {
        applications : []
    },
    reducers :{
        setSingleApplication : (state, action)=> {
            state.applicants = action.payload;
        }
    }
});

export const { setSingleApplication } = applicationSlice.actions;

export default applicationSlice.reducer;

export const applicationSliceReducer = applicationSlice.reducer;