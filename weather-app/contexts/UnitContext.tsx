"use client"
import { createContext, useState } from "react";
export const unitContext = createContext(null);
export default function DataContext({ children }) {

  const [unit, setUnit] = useState("c")
  return <unitContext.Provider value={{ unit, setUnit }}>
    {children}
  </unitContext.Provider>;


}
