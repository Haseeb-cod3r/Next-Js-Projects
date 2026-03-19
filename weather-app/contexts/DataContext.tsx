"use client"
import { createContext, useState } from "react";
export const dataContext = createContext(null);
export default function DataContext({ children }) {

      const [weather, setWeather] = useState({})
      async function fetchWeather(location) {
            try {

                  const res = await fetch(
                        `https://api.weatherapi.com/v1/current.json?key=f52f0c02a30d433596e11847261303&q=${location}`,
                  );
                  const Data = await res.json();
                  setWeather(Data)
            } catch (err) {
                  console.log(err);
            }

      }
      return <dataContext.Provider value={{ weather, setWeather,fetchWeather }}>
            {children}
      </dataContext.Provider>;


}
