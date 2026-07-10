import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import DevStash from "@/components/DevStash";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-parchment">
      <Toaster position="top-center" />
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-parchment">
          <DevStash />
          <Chat/>
        </main>
      </div>
    </div>
  );
}