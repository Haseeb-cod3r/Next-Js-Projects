"use client"
import { dataContext } from "@/contexts/DataContext";
import { Map, Compass } from "lucide-react";
import { useContext } from "react";

export default function Label({ name }) {
      const { weather } = useContext(dataContext)
      if (weather?.current && weather?.location) {
            if (name === "compass") {

                  return (
                        <div className="flex justify-center items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/10 p-2 rounded-full mb-5">
                              <Map color="#35e4ff" />
                              <p className="text-white">{weather.location.name}, {weather.location.country}</p>
                        </div>
                  )
            }
            if (name === "map") {
                  return (
                        <div className="flex justify-center items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/10 p-2 rounded-full mb-5">
                              <Compass color="yellow" />
                              <p className="text-white">Lat: {weather.location.lat}, Lon: {weather.location.lon}</p>
                        </div>
                  )
            }
      }
}
