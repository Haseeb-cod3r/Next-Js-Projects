import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppData from "@/contexts/AppData";
import ModalData from "@/contexts/ModalData";
import State from "@/contexts/State";
import Search from "@/contexts/Search";
import Tag from "@/contexts/Tag";
import { ClerkProvider } from '@clerk/nextjs'



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "DevStash Save, Organize & Manage Your Sites Links",
  description:
    "DevStash is a personal link and resource manager for developers. Save, tag, search, sort, pin, and archive the tools and articles you don't want to lose with an AI assistant that can do it all through natural language.",
  keywords: [
    "DevStash",
    "link manager",
    "bookmark manager",
    "developer tools",
    "resource organizer",
    "AI assistant",
  ],
  authors: [{ name: "Haseeb-Ur-Rehman" }],
  creator: "Haseeb-Ur-Rehman",
  openGraph: {
    title: "DevStash Save, Organize & Manage Your Sites Links",
    description:
      "A personal link and resource manager for developers, with tagging, sorting, archiving, and a built-in AI assistant.",
    siteName: "DevStash",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DevStash Save, Organize & Find Your Dev Links",
    description:
      "Save, tag, and organize your developer links powered by an AI assistant that does the work for you.",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-parchment text-ink font-sans">
        <AppData>
          <ModalData>
            <State>
              <Tag>
                <Search>{children}</Search>
              </Tag>
            </State>
          </ModalData>
        </AppData>
      </body>
    </html>
    </ClerkProvider>
  );
}