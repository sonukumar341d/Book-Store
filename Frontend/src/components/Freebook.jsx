import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Freebook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        const filterData = res.data.filter((data) => data.category === "free");

        setBook(filterData);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <h1 className="font-semibold text-xl pb-2">Free offered Courses</h1>

      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

      {book.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          grabCursor={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {book.map((item) => (
            <SwiperSlide key={item._id}>
              <Cards item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default Freebook;
