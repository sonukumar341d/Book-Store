import React from "react";
import BannerPic from "../assets/BannerPic.jpg";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">

      {/* Left */}
      <div className="w-full md:w-1/2 order-2 md:order-1 mt-12 md:mt-32">

        <div className="space-y-6">

          <h1 className="text-4xl font-bold">
            Hello, Welcomes here to learn something
            <span className="text-pink-500"> new everyday!!!</span>
          </h1>

          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              placeholder="mail@site.com"
              className="grow outline-none"
            />
          </label>

          <button className="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md duration-300">
  Secondary
</button>

        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 order-1 flex justify-center">

        <img
          src={BannerPic}
          alt="banner"
          className="w-full md:w-[450px]"
        />

      </div>
    </div>
  );
};

export default Banner;