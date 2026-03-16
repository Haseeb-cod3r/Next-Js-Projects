
export default function Header() {
  return (
    <div className="flex items-end justify-center fixed top-[10px] right-[10px]">
        <button className=" bg-white/10 backdrop-blur-lg border border-white/30 px-3 py-2 rounded-full text-white/30"><span className="text-[#04bbd8] font-bold mr-2">°C </span>| <span className="text-white/30 font-bold ml-2">°F</span></button>
    </div>
  )
}
