"use client"
import { createContext, Dispatch, SetStateAction, useState } from "react";
interface AppContext {
  value:string;
  setValue:Dispatch<SetStateAction<string>>
}
export const appContext = createContext<AppContext | null>(null);
export default function DataContext({ children }: Readonly<{ children: React.ReactNode }>) {

  const [value, setValue] = useState<string>('')
  return <appContext.Provider value={{ value, setValue }}>
    {children}
  </appContext.Provider>;


}
