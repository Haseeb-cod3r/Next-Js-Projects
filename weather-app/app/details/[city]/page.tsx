"use client"

import { ArrowLeft } from "lucide-react";
import InfoBox from "../../../components/InfoBox"
import Link from "next/link";
import Label from "../../../components/Label"
import { use, useContext, useEffect } from "react";
import { dataContext } from "@/contexts/DataContext";
import Header from "../../../components/Header";
export default function DetailsPage({ params }) {
  const { weather,  fetchWeather } = useContext(dataContext)

 const {city} = use(params)
  useEffect(()=>{
   fetchWeather(city)

  },[params])

  if (weather.current && weather.location) {
    return (
      <main className="flex flex-col items-start px-10">
        <Header/>
        <Link href={"/"}>
          <div className="flex gap-2 justify-center items-center text-white  bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl py-2 text-[15px] cursor-pointer px-4 mb-10 group">
          <div className="transition-all ease-in-out duration-[.25s] group-hover:translate-x-[-4px]"> 
            <ArrowLeft />
          </div>
            
            <p>Back to Search</p>
          </div></Link>

        <h1 className="text-white text-[50px] font-bold mb-3">{city}</h1>
        <div className="flex items-center justify-center gap-3 mb-5">

          <Label name={"compass"} />
          <Label name={"map"} />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 w-full gap-7">
          <InfoBox name={"temperature"} />
          <InfoBox name={"wind"} />
          <InfoBox name={"atmosphere"} />
          <InfoBox name={"condition"} />
        </div>
      </main>
    );
  } 
}

