"use client"

import React, { createContext, useState } from 'react'

export const TagContext = createContext({})
export default function Tag({ children }) {
  const [checkedTags, setCheckedTags] = useState([])
  const [appliedTags, setAppliedTags] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tags, setTags] = useState([])
  const [tagData, setTagData] = useState({ isTagData: false, data: [] })

  function generateTags(data, setAppliedTags, setCheckTags) {
    const tagCounts = {};
    data.forEach((item) => {
      item.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    const allTagsFilter = Object.keys(tagCounts).map((tagName) => ({
      name: tagName,
      count: tagCounts[tagName],
    }));
    allTagsFilter.sort((a, b) => a.name.localeCompare(b.name));
    if (!(allTagsFilter.length === tags.length)) {
      setAppliedTags([])
      setCheckTags([])
    }
    setTags(allTagsFilter);
  }



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



  return (
    <TagContext.Provider value={{ tags, setTags, tagData, setTagData, generateTags, sortAccTags, checkedTags, setCheckedTags, appliedTags, setAppliedTags,mobileOpen, setMobileOpen }}>
      {children}
    </TagContext.Provider>
  )
}
