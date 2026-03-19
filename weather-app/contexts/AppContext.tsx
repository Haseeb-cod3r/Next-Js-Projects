"use client"
import { createContext, useState } from "react";
export const appContext = createContext(null);
export default function DataContext({ children }) {

  const [value, setValue] = useState('')
  return <appContext.Provider value={{ value, setValue }}>
    {children}
  </appContext.Provider>;


}
