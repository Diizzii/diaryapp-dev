import React, { useContext, useState, useEffect } from 'react'

import Header from '../components/Header'

import Entry from '../components/Entry'
import { AuthContext } from '../context/AuthContext'
import { fb } from '../service/firebase'
import NoEntries from '../components/NoEntries'
import Loading from '../components/Loading'
import Footer from '../components/Footer'

const AllEntriesPage = () => {
  const { uid, postNo, setPostNo } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    const abortController = new AbortController()

    setIsLoading(true)
    fb.firestore
      .collection('diaryUsers')
      .doc(uid)
      .get()
      .then((res) => {
        const uName = res.data().userName
        localStorage.setItem('userName', uName)
      })
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err))

    return function cleanup() {
      abortController.abort()
    }
  }, [uid])

  useEffect(() => {
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
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err))
  }, [uid, setPostNo])

  const deleteHandler = (currentId) => {
    const updatedPosts = posts.filter((post) => post.id !== currentId)
    setPosts(updatedPosts)

    fb.firestore
      .collection('diaryEntries')
      .doc(currentId)
      .delete()
      .then(() => setPostNo((postNo) => postNo - 1))
      .catch((err) => console.error(err))
  }

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
      <Footer />
    </div>
  )
}

export default AllEntriesPage
