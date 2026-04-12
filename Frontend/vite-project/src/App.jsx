import React from 'react'
import './App.css'  
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/Home';


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
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
