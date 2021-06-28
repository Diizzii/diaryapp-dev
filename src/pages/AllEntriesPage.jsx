import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'

import Entry from '../components/Entry'
import { AuthContext } from '../context/AuthContext'
import { fb } from '../service/firebase'
import { current } from 'immer'

const AllEntriesPage = () => {
  const [uid, setUid] = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  const getPosts = () => {
    fb.firestore
      .collection('diaryEntries')
      .where('userId', '==', uid)
      .get()
      .then((data) => data.forEach((doc) => doc.data()))
  }
  useEffect(() => {
    const currentPosts = getPosts()
    console.log(currentPosts)
  }, [uid])

  if (!uid) return <Redirect to='/login' />
  return (
    <div>
      <Header />
      <div className='container'>kommt noch</div>
    </div>
  )
}

export default AllEntriesPage
