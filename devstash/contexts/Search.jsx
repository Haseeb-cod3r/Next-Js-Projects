"use client"

import React, { createContext, useState } from 'react'

export const SearchContext = createContext({})
export default function Search({ children }) {


  function sortSearchData(data, value) {
    if (value === "") {
      setSearchData({ isSearchData: false, data: [] })
      return
    }
    
      const sortedSearchData = data.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase())
      })
      setSearchData({ isSearchData: true, data: sortedSearchData })

  }

  const [searchData, setSearchData] = useState({ isSearchData: false, data: [] })
  const [searchValue, setSearchValue] = useState("")

  return (
    <SearchContext.Provider value={{ searchData, setSearchData, searchValue, setSearchValue, sortSearchData }}>
      {children}
    </SearchContext.Provider>
  )
}
