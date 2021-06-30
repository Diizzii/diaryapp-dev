import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState('')
  const [postId, setPostId] = useState('')
  const [postNo, setPostNo] = useState(0)
  const [userName, setUserName] = useState('')

  const value = {
    uid,
    setUid,
    postId,
    setPostId,
    postNo,
    setPostNo,
    userName,
    setUserName,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
