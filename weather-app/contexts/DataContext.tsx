"use client"
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface weatherObj {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch?: number
    localtime: string
  }
  current: {
    last_updated_epoch: number,
    last_updated: string,
    temp_c: number,
    temp_f: number,
    is_day: number,
    condition: {
      text: string,
      icon: string,
      code: number
    },
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    windchill_c: number,
    windchill_f: number,
    heatindex_c: number,
    heatindex_f: number,
    dewpoint_c: number,
    dewpoint_f: number,
    vis_k: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
    short_rad: number,
    diff_rad: number,
    dni: number,
    gti: number
  }
}

interface DataContext {
  weather: weatherObj | null
  setWeather: Dispatch<SetStateAction<weatherObj | null>>
  fetchWeather: (Location: string) => Promise<void>
}
export const dataContext = createContext<DataContext | null>(null);

export default function DataContext({ children }: Readonly<{ children: React.ReactNode }>) {

  const [weather, setWeather] = useState<weatherObj | null>(null)
  async function fetchWeather(location: string):Promise<void> {
    try {

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=f52f0c02a30d433596e11847261303&q=${location}`,
      );
      const Data: weatherObj = await res.json();
      setWeather(Data)
    } catch (err) {
      console.log(err);
    }

  }
  return <dataContext.Provider value={{ weather, setWeather, fetchWeather }}>
    {children}
  </dataContext.Provider>;


}
