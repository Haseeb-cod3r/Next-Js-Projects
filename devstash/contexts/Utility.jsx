"use client"


import React, { createContext, useContext } from 'react'
import { AppContext } from './AppData'

export const UtilityContext = createContext({})
export default function Utility({ children }) {
  const { setTagData } = useContext(AppContext)

  function sortAccTags(tagsArray, data) {
    if (!tagsArray || tagsArray.length === 0) {
      setTagData({ isTagData: false, data: [] })
      return
    }
    if (tagsArray) {
      const filterData = data.filter((item) => {

        const isTrue = tagsArray.every((arrayTag) => {
          const isTrue = item.tags.some((itemTag) => {
            return itemTag === arrayTag
          })
          return isTrue
        })
        return isTrue
      })
      setTagData({ isTagData: true, data: filterData })
    }
  }
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
    <UtilityContext.Provider value={{ sortData, sortAccTags }}>
      {children}
    </UtilityContext.Provider>
  )
}
