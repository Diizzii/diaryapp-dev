import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'

import Entry from '../components/Entry'
import { AuthContext } from '../context/AuthContext'
import { fb } from '../service/firebase'

const AllEntriesPage = () => {
  const { uid } = useContext(AuthContext)
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
          })
        })
      setIsLoading(false)
    }
    getPosts()
  }, [uid])

  if (!uid) return <Redirect to='/login' />
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <Header />
      <div className='container'>
        {posts.map((post) => {
          return <Entry key={post.id} {...post} deleteHandler={deleteHandler} />
        })}
      </div>
    </div>
  )
}

export default AllEntriesPage
