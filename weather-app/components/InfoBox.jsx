"use client"

import { dataContext } from "@/contexts/DataContext";
import { unitContext } from "@/contexts/UnitContext";
import { ThermometerSun, Wind, Activity, CloudRain } from "lucide-react";
import { useContext } from "react";
export default function InfoBox({ name }) {
  const { weather } = useContext(dataContext)
  const { unit } = useContext(unitContext)
  if (weather?.current && weather?.location) {
    if (name === "condition") {
      const data = [
        { label: "Visibility", name: `${weather.current.vis_km}`, placeholder: `km` },
        { label: "Cloud Cover", name: `${weather.current.cloud}%` },
        { label: "Precipitation", name: `${weather.current.precip_mm}`, placeholder: `mm` },
        { label: "Status", name: `${weather.current.is_day ? "Day" : "Night"}` },
      ];
      return (
        <div className="flex max-custom2:items-center flex-col gap-6 p-6 text-white bg-gradient-to-br from-white/7 to-white/7 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
          <div className="flex gap-3 items-center">
            <div className="bg-white/6 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-inner">
              <CloudRain size={20} className="text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide opacity-90">
              Conditions
            </h2>
          </div>

          <div className="grid grid-cols-2 max-custom2:grid-cols-1 gap-y-10 gap-x-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center place-self-center flex-col gap-1">
                <p className="text-xs font-medium tracking-wider text-white/50">
                  {item.label}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tabular-nums">{item.name}</span>
                  {item.placeholder && (
                    <span className="text-sm font-medium text-white/40">
                      {item.placeholder}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (name === "atmosphere") {
      const data = [
        { label: "Humidity", name: `${weather.current.humidity}%` },
        { label: "Dew Point", name: `${weather.current.dewpoint_c}°` },
        { label: "Pressure", name: `${weather.current.pressure_mb}`, placeholder: `mb` },
        { label: "UV Index", name: `${weather.current.uv}` },
      ];
      return (
        <div className="flex flex-col max-custom2:items-center gap-6 p-6 text-white bg-gradient-to-br from-white/7 to-white/7 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
          <div className="flex gap-3 items-center">
            <div className="bg-white/6 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-inner">
              <Activity size={20} className="text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide opacity-90">
              Atmosphere
            </h2>
          </div>

          <div className="grid grid-cols-2 max-custom2:grid-cols-1 gap-y-10 gap-x-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center place-self-center flex-col gap-1">
                <p className="text-xs font-medium tracking-wider text-white/50">
                  {item.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tabular-nums">{item.name}</span>
                  {item.placeholder && (
                    <span className="text-sm font-medium text-white/40">
                      {item.placeholder}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (name === "wind") {
      const data = [
        { label: "Speed", name: `${weather.current.wind_kph}`, placeholder: `km/h` },
        { label: "Gusts", name: `${weather.current.gust_kph}`, placeholder: `km/h` },
        { label: "Gusts (mph)", name: `${weather.current.gust_mph}`, placeholder: `mph` },
        { label: "Speed (mph)", name: `${weather.current.wind_mph}`, placeholder: `mph` },
      ];
      return (
        <div className="flex flex-col max-custom2:items-center gap-6 p-6 text-white bg-gradient-to-br from-white/7 to-white/7 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
          <div className="flex gap-3 items-center">
            <div className="bg-white/6 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-inner">
              <Wind size={20} className="text-[#35e4ff]" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide opacity-90">
              Wind
            </h2>
          </div>

          <div className="grid max-custom2:grid-cols-1 grid-cols-2 gap-y-10 gap-x-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center place-self-center flex-col gap-1">
                <p className="text-xs font-medium tracking-wider text-white/50">
                  {item.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tabular-nums">{item.name}</span>
                  {item.placeholder && (
                    <span className="text-sm font-medium text-white/40">
                      {item.placeholder}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (name === "temperature") {
      const data = [
        { label: "Current", c: `${weather.current.temp_c}°C`, f: `${weather.current.temp_f}°F` },
        { label: "Feels Like", c: `${weather.current.feelslike_c}°C`, f: `${weather.current.feelslike_f}°F` },
        { label: "Heat Index", c: `${weather.current.heatindex_c}°C`, f: `${weather.current.heatindex_f}°F` },
        { label: "Wind Chill", c: `${weather.current.windchill_c}°C`, f: `${weather.current.windchill_f}°F` },
      ];
      return (
        <div className="flex max-custom2:items-center flex-col gap-6 p-6 text-white bg-gradient-to-br from-white/7 to-white/7 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
          <div className="flex gap-3 items-center">
            <div className="bg-white/6 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-inner">
              <ThermometerSun size={20} className="text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold tracking-wide opacity-90">
              Temperature
            </h2>
          </div>

          <div className="grid max-custom2:grid-cols-1 grid-cols-2 gap-y-10 gap-x-4">
            {data.map((item, index) => (
              unit === "c" ?
                <div key={index} className="flex items-center place-self-center flex-col gap-1">
                  <p className="text-xs font-medium tracking-wider text-white/50">
                    {item.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tabular-nums">{item.c}</span>
                    {item.f && (
                      <span className="text-sm font-medium text-white/40">
                        {item.f}
                      </span>
                    )}
                  </div>
                </div> : <div key={i} className="flex flex-col gap-1">
                  <p className="text-xs font-medium tracking-wider text-white/50">
                    {item.label}

                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tabular-nums">{item.f}</span>
                    {item.c && (
                      <span className="text-sm font-medium text-white/40">
                        {item.c}
                      </span>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </div>
      );
    }

  }
}
