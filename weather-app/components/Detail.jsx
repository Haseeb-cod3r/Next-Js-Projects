"use client";

import { appContext } from "@/contexts/AppContext";
import { dataContext } from "@/contexts/DataContext";
import { unitContext } from "@/contexts/UnitContext";
import { Droplets, Wind, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
export default function Detail() {
  const {unit} = useContext(unitContext)
  const { weather } = useContext(dataContext)
  const { value } = useContext(appContext)
  if (Object.keys(weather).length === 0) {
    return <h1 className="text-white">Enter a city name to see it's weather</h1>
  }
  if (weather.error) {
    return <h1 className="text-white">{weather.error.message}</h1>
  }
  if (weather.current && weather.location) {
    return (
      <div className="text-white flex flex-col items-center justify-center text-center w-[50%] p-5  bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl">
        <div className="flex items-center gap-2 border-[#42b1c5]/20 border p-2 rounded-full bg-[#19364a] mb-5">
          <MapPin color="#35e4ff" />
          <p className="text-[#35e4ff] text-[13px]">
            <span>{weather.location.name}</span>, {weather.location.country}
          </p>
        </div>
        <p className="mb-10">
          {weather.location.localtime}
        </p>
        <div className="mb-10 flex justify-between items-center w-full px-10">
          <img src={weather.current.condition.icon} alt="" />

          <div className="flex flex-col items-start">
            {unit === "c" ? <div className="flex items-start">
              <span className="text-[50px] font-medium leading-none">{weather.current.temp_c}</span>
              <div className="flex flex-col pt-1 ml-1">
                {" "}
                <span className="text-sm leading-none mb-1 text-[20px]">°C</span>
                <span className="text-sm leading-none text-gray-400">{weather.current.temp_f} °F</span>
              </div>
            </div> : <div className="flex items-start">
              <span className="text-[50px] font-medium leading-none">{weather.current.temp_f}</span>
              <div className="flex flex-col pt-1 ml-1">
                {" "}
                <span className="text-sm leading-none mb-1 text-[20px]">°F</span>
                <span className="text-sm leading-none text-gray-400">{weather.current.temp_c} °C</span>
              </div>
            </div>}


            <span className="mt-1">{weather.current.condition.text}</span>
          </div>
        </div>
        <div className="flex w-full justify-between gap-4 mb-10">
          <div className="flex justify-between items-center gap-3  bg-white/1 backdrop-blur-lg border border-white/10 py-2 px-10 w-full rounded-2xl">
            <Wind color="#04bbd8" />
            <div className="text-start">
              <p className="font-extralight">Wind</p>
              <p className="font-extralight">
                <span className="font-bold">{weather.current.wind_kph}</span> km/h
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3  bg-white/1 backdrop-blur-lg border border-white/10 py-2 w-full px-10 rounded-2xl">
            <Droplets color="#50a2ff" />
            <div className="text-start">
              <p className="font-extralight">Humidity</p>
              <p className="font-bold">{weather.current.humidity}%</p>
            </div>
          </div>
        </div>
        <Link href={`/details/${value ? value : weather.location.name}`} className="w-full">
          <div className="flex gap-2 justify-center items-center  bg-white/1 backdrop-blur-lg border border-white/10 w-full rounded-2xl py-2 text-[15px] cursor-pointer group">
            <p>View Full Details</p>
            <div className="transition-all ease-in-out duration-[.25s] group-hover:translate-x-[6px]">
              <ArrowRight />
            </div>

          </div>
        </Link>
      </div>
    );
  }
}
