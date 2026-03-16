import { ArrowRight, Map, Compass } from "lucide-react";
import InfoBox from "../../components/InfoBox"
import Link from "next/link";
export default function DetailsPage() {
  return (
    <main className="flex flex-col items-start px-10">
      <Link href={"/"}>
       <div className="flex gap-2 justify-center items-center text-white  bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl py-2 text-[15px] cursor-pointer px-4 mb-10">
        <ArrowRight />
        <p>Back to Search</p>
      </div></Link>
     
      <h1 className="text-white text-[50px] font-bold mb-3">New York</h1>
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="flex justify-center items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/10 p-2 rounded-full mb-5">
          <Map color="#35e4ff" />
          <p className="text-white">New York, United States of America</p>
        </div>
        <div className="flex justify-center items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/10 p-2 rounded-full mb-5">
          <Compass color="yellow" />
          <p className="text-white">Lat: 40.7142, Lon: -74.0064</p>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 w-full gap-7">
            <InfoBox/>
            <InfoBox/>
            <InfoBox/>
            <InfoBox/>
      </div>
    </main>
  );
}
