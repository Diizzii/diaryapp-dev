import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState('')
  const [postId, setPostId] = useState('')

  const value = { uid, setUid, postId, setPostId }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
