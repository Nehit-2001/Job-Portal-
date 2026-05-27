import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const Category = [
  "Web Development",
  "Data Structures & Algorithms",
  "Machine Learning",
  "Artificial Intelligence",
  "Cyber Security",
  "Cloud Computing",
  "Database Management System",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Mobile App Development",
  "DevOps",
  "Blockchain Technology",
  "Data Science",
  "UI/UX Design",
  "Video Editing",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="w-full max-w-6xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center text-[#2777e7de]">
        Category
      </h1>
      <p className="text-center mb-2 text-[#141c28de] font-semibold">
        Explore our extensive job market
      </p>

      <div className="w-full max-w-4xl mx-auto my-6">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 2000 }}
          navigation
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {Category.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#2777e7de] text-white p-3 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300">
                <button onClick={() => searchJobHandler(item)}>{item}</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
