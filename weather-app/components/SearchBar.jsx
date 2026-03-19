"use client"

import { appContext } from "@/contexts/AppContext"
import { dataContext } from "@/contexts/DataContext"
import { useContext, useState } from "react"

export default function SearchBar() {
      const {value, setValue} = useContext(appContext)
      const { fetchWeather } = useContext(dataContext)
      function handleOnKeyDown(e) {
            if (e.key === "Enter" && value !== "") {
                  fetchWeather(value)
            }
      }
      function handleOnClick() {
            if (value !== "") {
                  fetchWeather(value)
            }
      }
      return (
            <div className="flex justify-between bg-white/10 backdrop-blur-lg w-[50%] rounded-full px-3 py-2 border border-white/10 mb-15">
                  <input className="border-none outline-none px-3 text-white tracking-wider ml-10" type="text" name="searchBar" id="search" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleOnKeyDown} />
                  <button onClick={handleOnClick} className="bg-blue-400 text-white font-bold
       px-4 py-2 rounded-full cursor-pointer">Search</button>
            </div>
      )
}
