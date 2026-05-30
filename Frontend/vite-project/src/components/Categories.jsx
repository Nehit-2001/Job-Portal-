import React from "react"; // ✅ removed unused useEffect
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
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
    <div className="w-full max-w-6xl mx-auto my-10 px-4"> 

      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2777e7de]">
        Browse by Category
      </h1>
      <p className="text-center mb-4 mt-1 text-[#141c28de] font-medium text-sm md:text-base">
        Explore our extensive job market
      </p>

      <div className="w-full my-6">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }} // keeps autoplay after manual swipe
          navigation
          breakpoints={{
            320:  { slidesPerView: 1, navigation: false }, // no arrows on mobile
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {Category.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                onClick={() => searchJobHandler(item)}
                className="w-full bg-[#2777e7de] text-white p-3 rounded-2xl shadow-lg text-center hover:scale-105 hover:bg-[#1a5fc8] transition duration-300 text-sm md:text-base font-medium"
              >
                {item}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default Categories;