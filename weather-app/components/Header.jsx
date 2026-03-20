"use client"

import { unitContext } from "@/contexts/UnitContext"
import { useContext } from "react"

export default function Header() {
  const { setUnit, unit } = useContext(unitContext)
  return (
    <div className="flex items-end justify-end mt-4 mr-6 w-full mb-10 ">
      <button className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/30 px-3 py-2 rounded-full text-white/30">
        <span onClick={() => setUnit("c")} className={` ${unit === "c" ? "text-[#04bbd8]" : "text-white/30"}  font-bold mr-2`}>
          °C
        </span>|
        <span onClick={() => setUnit("f")} className={`${unit === "f" ? "text-[#04bbd8]" : "text-white/30"} font-bold ml-2`}>
          °F
        </span>
      </button>
    </div>
  )
}
