import React, { useContext, useState, useEffect } from 'react'

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

  useEffect(() => {
    const getUserName = () => {
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
    }

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
        .then(() => setIsLoading(false))
    }
    getUserName()
    getPosts()
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
    </div>
  )
}

export default AllEntriesPage
