"use client"

import { ArrowLeft } from "lucide-react";
import InfoBox from "../../../components/InfoBox"
import Link from "next/link";
import Label from "../../../components/Label"
import { use, useContext, useEffect } from "react";
import { dataContext } from "@/contexts/DataContext";
import Header from "../../../components/Header";


interface paramObj {
  params: Promise<{
    city: String;
  }>;
}

export default function DetailsPage({ params }: paramObj) {
  const context = useContext(dataContext)
  if (!context) throw Error("dataContext is null")
  const { weather, fetchWeather } = context

  const { city } = use(params)
  useEffect(() => {
    fetchWeather(city as string)
  }, [city])

  if (weather?.current && weather?.location) {
    return (
      <>
        <Header />
      <main className="flex flex-col max-md:items-center items-start mx-10">
        <Link href={"/"}>
          <div className="flex gap-2 justify-center items-center text-white  bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl py-2 text-[15px] cursor-pointer px-4 mb-10 group">
            <div className="transition-all ease-in-out duration-[.25s] group-hover:translate-x-[-4px]">
              <ArrowLeft />
            </div>

            <p>Back to Search</p>
          </div></Link>

        <h1 className="text-white text-[50px] font-bold mb-3">{city}</h1>
        <div className="flex max-md:flex-col items-center justify-center gap-3 mb-5">

          <Label name={"compass"} />
          <Label name={"map"} />
        </div>
        <div className="grid max-md:grid-cols-1 grid-cols-2 grid-rows-2 w-full gap-7">
          <InfoBox name={"temperature"} />
          <InfoBox name={"wind"} />
          <InfoBox name={"atmosphere"} />
          <InfoBox name={"condition"} />
        </div>
      </main>
      </>
    );
  }
}

