import SearchBar from "../components/SearchBar";
import Detail from "../components/Detail";
import Header from "../components/Header";
export default async function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center max-w-[500px] w-full px-10">
        <h1 className="text-[#cef9fe] font-bold text-6xl mb-5 max-custom1:text-4xl">Atmosphere</h1>
        <p className="text-white font-medium tracking-wide  mb-10 text-center max-custom1:text-[12px]">
          Beautiful, precise weather intelligence for any <br />
          location on Earth.
        </p>
        <SearchBar />
        <Detail />
      </main>
    </>
  );
}
