import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import DevStash from "@/components/DevStash";
export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Toaster position="top-center" />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-8">
          <DevStash />
        </main>
      </div>
    </div>
  );
}
