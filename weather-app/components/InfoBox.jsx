// import { ThermometerSun } from "lucide-react";

// export default function InfoBox() {
//   return (
//     <div className="flex flex-col gap-5 p-5 text-white  bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl">
//       <div className="flex gap-2 items-center">
//         <div className="bg-white/0 backdrop-blur-lg border border-white/10 p-3 rounded-[10px]">
//           <ThermometerSun color="yellow" />
//         </div>

//         <h2>Temperature</h2>
//       </div>
//       <div className="grid grid-cols-2 grid-rows-2 gap-4">
//         <div className="flex flex-col ">
//           <p className="text-gray-400">Current</p>
//           <p className="flex items-end">
//             <span className="text-[30px]">4°</span>
//             <span className="text-gray-400">40°F</span>
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-400">Feels Like</p>
//           <p className="flex items-end ">
//             <span className="text-[30px]">-1°</span>
//             <span className="text-gray-400">30°F</span>
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-400">Heat Index</p>
//           <p className="flex items-end ">
//             <span className="text-[30px]">5°</span>
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-400">Wind Chill</p>
//           <p className="flex items-end ">
//             <span className="text-[30px]">0°</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { ThermometerSun } from "lucide-react";
const data = [
  { label: "Current", c: "4°", f: "40°F" },
  { label: "Feels Like", c: "-1°", f: "30°F" },
  { label: "Heat Index", c: "5°" },
  { label: "Wind Chill", c: "0°" },
];
export default function InfoBox() {
  return (
    <div className="flex flex-col gap-6 p-6 text-white bg-gradient-to-br from-white/7 to-white/7 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
      <div className="flex gap-3 items-center">
        <div className="bg-white/6 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-inner">
          <ThermometerSun size={20} className="text-yellow-400" />
        </div>
        <h2 className="text-lg font-semibold tracking-wide opacity-90">
          Temperature
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-wider text-white/50">
              {item.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums">{item.c}</span>
              {item.f && (
                <span className="text-sm font-medium text-white/40">
                  {item.f}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
