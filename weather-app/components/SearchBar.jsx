

export default function SearchBar() {
  return (
   <div className="flex justify-between bg-white/10 backdrop-blur-lg w-[50%] rounded-full px-3 py-2 border border-white/10 mb-15">
      <input className="border-none outline-none px-3 text-white tracking-wider ml-10" type="text" name="searchBar" id="search" />
      <button className="bg-blue-400 text-white font-bold
       px-4 py-2 rounded-full cursor-pointer">Search</button>
   </div>
  )
}
