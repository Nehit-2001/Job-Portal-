import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState:{
        singleCompany: {},
        companies: [],
        searchCompanybyText:""
    },
    reducers:{
        setSingleCompany : (state, action)=> {
            state.singleCompany = action.payload;
        },
        setCompanies : (state, action)=> {
            state.companies = action.payload;
        },
        setSearchCompanybyText : (state, action)=> {
            state.searchCompanybyText = action.payload;
        }
    }
})

export const { setSingleCompany, setCompanies, setSearchCompanybyText } = companySlice.actions;
export const companyReducer =  companySlice.reducer;
export { companySlice };