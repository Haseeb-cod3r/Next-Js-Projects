"use client"

import React, { createContext, useState } from 'react'

export const ModalContext = createContext({})
export default function ModalData({ children }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    url: "",
    description:
      "",
    tags: [],
    views: 0,
    created: Date.now(),
    isArchived: false,
    isPinned: false,
    pinnedAt: null

  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tagValue, setTagValue] = useState("")
  const [isEditMode, setIsEditMode] = useState({ edit: false, isArchiveEdit: false })


  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, formData, setFormData, tagValue, setTagValue, isEditMode, setIsEditMode }}>
      {children}
    </ModalContext.Provider>
  )
}
