"use client"


import React, { createContext, useState } from 'react'


export const StateContext = createContext({})
export default function Utility({ children }) {
  const [activeNav, setActiveNav] = useState('home')
  const [sort, setSort] = useState('Latest')

  function sortData(sortAction, data, setData) {
    if (sortAction === "date") {
      const sortedData = [...data.sort((a, b) => new Date(b.created) - new Date(a.created))]
      return sortedData
    }
    if (sortAction === "Latest") {

      const sortedData = [...data.sort((a, b) => new Date(b.created) - new Date(a.created))]
      setData([...sortedData])
      return
    } else if (sortAction === "Oldest") {

      const sortedData = [...data.sort((a, b) => new Date(a.created) - new Date(b.created))]

      setData([...sortedData])
      return
    } else if (sortAction === "Most viewed") {

      const sortedData = [...data.sort((a, b) => b.views - a.views)]
      setData([...sortedData])
      return
    } else if (sortAction === "Least viewed") {
      const sortedData = [...data.sort((a, b) => a.views - b.views)]
      setData([...sortedData])
      return
    }

  }

  return (
    <StateContext.Provider value={{ sortData, activeNav, setActiveNav, sort, setSort }}>
      {children}
    </StateContext.Provider>
  )
}
