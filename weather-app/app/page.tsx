import SearchBar from "../components/SearchBar";
import Detail from "../components/Detail";
import Header from "../components/Header";
export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Header/>
      <h1 className="text-[#cef9fe] font-bold text-6xl mb-5">Atmosphere</h1>
      <p className="text-white font-medium tracking-wide  mb-10 text-center">
        Beautiful, precise weather intelligence for any <br />
        location on Earth.
      </p>
      <SearchBar />
      <Detail />
    </main>
  );
}
