import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../Hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <Header />
      <Categories />
      <LatestJobs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
