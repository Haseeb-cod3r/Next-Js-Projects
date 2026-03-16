"use client";

import { Droplets, Wind, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
export default function Detail() {
  return (
    <div className="text-white flex flex-col items-center justify-center text-center w-[50%] p-5  bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl">
      <div className="flex items-center gap-2 border-[#42b1c5]/20 border p-2 rounded-full bg-[#19364a] mb-5">
        <MapPin color="#35e4ff" />
        <p className="text-[#35e4ff] text-[13px]">
          New York, United States of America
        </p>
      </div>
      <p className="mb-10">
        Friday, 13 March <span className="font-extrabold">·</span> 9:26 PM
      </p>
      <div className="mb-10 flex gap-20 justify-center items-center w-full">
        <img src="//cdn.weatherapi.com/weather/64x64/night/116.png" alt="" />

        <div className="flex flex-col items-start">
          <div className="flex items-start">
            <span className="text-[50px] font-medium leading-none">4</span>
            <div className="flex flex-col pt-1 ml-1">
              {" "}
              <span className="text-sm leading-none mb-1 text-[20px]">°C</span>
              <span className="text-sm leading-none text-gray-400">40°F</span>
            </div>
          </div>

          <span className="mt-1">Clear</span>
        </div>
      </div>
      <div className="flex w-full justify-between gap-4 mb-10">
        <div className="flex justify-between items-center gap-3  bg-white/1 backdrop-blur-lg border border-white/10 py-2 px-10 w-full rounded-2xl">
          <Wind color="#04bbd8" />
          <div className="text-start">
            <p className="font-extralight">Wind</p>
            <p className="font-extralight">
              <span className="font-bold">33.1</span> km/h
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3  bg-white/1 backdrop-blur-lg border border-white/10 py-2 w-full px-10 rounded-2xl">
          <Droplets color="#50a2ff" />
          <div className="text-start">
            <p className="font-extralight">Humidity</p>
            <p className="font-bold">65%</p>
          </div>
        </div>
      </div>
      <Link href={"/details"} className="w-full">
        <div className="flex gap-2 justify-center items-center  bg-white/1 backdrop-blur-lg border border-white/10 w-full rounded-2xl py-2 text-[15px] cursor-pointer">
          <p>View Full Details</p>
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}
