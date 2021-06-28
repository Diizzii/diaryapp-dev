import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState('')

  return (
    <AuthContext.Provider value={[uid, setUid]}>
      {children}
    </AuthContext.Provider>
  )
}
