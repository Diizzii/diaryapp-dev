import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'

import Entry from '../components/Entry'
import { AuthContext } from '../context/AuthContext'
import { fb } from '../service/firebase'
import NoEntries from '../components/NoEntries'
import Loading from '../components/Loading'

const AllEntriesPage = () => {
  const { uid, postNo, setPostNo } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const deleteHandler = (currentId) => {
    const updatedPosts = posts.filter((post) => post.id !== currentId)
    setPosts(updatedPosts)

    fb.firestore
      .collection('diaryEntries')
      .doc(currentId)
      .delete()
      .then(() => console.log('Entry deleted from Firebase'))
      .catch((err) => console.error(err))

    if (posts.length === 0) setPostNo(0)
  }

  useEffect(() => {
    setIsLoading(true)
    const getPosts = () => {
      fb.firestore
        .collection('diaryEntries')
        .where('userId', '==', uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const entry = doc.data()
            const entryPlusId = { id: doc.id, ...entry }
            setPosts((prevState) => [...prevState, entryPlusId])
            setPostNo((postNo) => postNo + 1)
          })
        })
      setIsLoading(false)
    }
    getPosts()
  }, [uid, setPostNo])

  if (!uid) return <Redirect to='/login' />

  return (
    <div>
      <Header />
      <div className='container'>
        {isLoading && <Loading />}
        {!isLoading && postNo === 0 && <NoEntries />}
        {!isLoading &&
          posts.map((post) => {
            return (
              <Entry key={post.id} {...post} deleteHandler={deleteHandler} />
            )
          })}
      </div>
    </div>
  )
}

export default AllEntriesPage
