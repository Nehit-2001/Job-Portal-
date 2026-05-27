import React from 'react'
import './App.css'  

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/Home';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsofUse from './components/TermsofUse.jsx';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import Description from './components/Description.jsx';
import Companies from './components/adminComponent/Companies.jsx';
import CompanyCreate from './components/adminComponent/CompanyCreate.jsx';
import CompanySetup from './components/adminComponent/CompanySetup.jsx';
import AdminJobs from './components/adminComponent/AdminJobs.jsx';
import JobPost from './components/adminComponent/JobPost.jsx';
import Applicants from './components/adminComponent/Applicants.jsx';
import ProtectedRoute from './components/adminComponent/ProtectedRoute.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/privacypolicy",
    element: <PrivacyPolicy/>
  },
  {
    path: "/termsofuse",
    element: <TermsofUse/>
  },
  {
    path:"/jobs",
    element: <Jobs/>
  },
  {
    path:"/browse",
    element: <Browse/>
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  {
    path:"/description/:id",
    element: <Description/>
  },

  // Path for Admin side
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute> <Companies/> </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate/>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup/>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs/>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/job/create",
    element: (
      <ProtectedRoute>
        <JobPost/>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants/>
      </ProtectedRoute>
    )
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
