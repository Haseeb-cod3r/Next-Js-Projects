"use client"
import React, { createContext, Dispatch, SetStateAction, useState } from "react";
interface uniteContext {
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>
}
export const unitContext = createContext<uniteContext | null>(null);
export default function DataContext({ children }: Readonly<{ children: React.ReactNode }>) {

  const [unit, setUnit] = useState<string>("c")
  return <unitContext.Provider value={{ unit, setUnit }}>
    {children}
  </unitContext.Provider>;


}
