import React, { useState, createContext, useEffect } from 'react'

import { fb } from '../service/firebase'
import Loading from '../components/Loading'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState(null)
  const [pending, setPending] = useState(true)
  const [postId, setPostId] = useState('')
  const [postNo, setPostNo] = useState(0)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    fb.auth.onAuthStateChanged((user) => {
      if (user) setUid(user.uid)
      setPending(false)
    })
  }, [])

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

  if (pending) return <Loading />

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
