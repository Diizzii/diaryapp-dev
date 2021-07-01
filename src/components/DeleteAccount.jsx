import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { fb } from '../service/firebase'

const DelecteAccount = () => {
  const { userName, setUserName, setPostNo, uid, setUid } =
    useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    const uName = localStorage.getItem('userName')
    setUserName(uName)
  }, [setUserName])

  const deleteHandler = () => {
    fb.auth.currentUser.delete().catch((err) => console.error(err))
    fb.firestore
      .collection('diaryUsers')
      .doc(uid)
      .delete()
      .catch((err) => console.error(err))
    fb.firestore
      .collection('diaryEntries')
      .where('userId', '==', uid)
      .get()
      .then(function (querySnapshot) {
        let batch = fb.firestore.batch()
        querySnapshot.forEach(function (doc) {
          batch.delete(doc.ref)
        })
        batch.commit()
      })
      .then(() => {
        setUserName('')
        setPostNo(0)
        setUid('')
        localStorage.removeItem('userName')
      })
      .then(() => {
        setTimeout(() => {
          history.push('/signup')
        }, 1000)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='container'>
      <h2>Are you sure you want to delete our account with us, {userName}?</h2>
      <p>We would be so sorry to see you go!</p>
      <button
        className='btn btn-primary'
        style={{ width: '100%' }}
        onClick={() => history.push('/entries')}
      >
        No, forget it!
      </button>
      <button
        className='btn btn-danger'
        onClick={deleteHandler}
        style={{ width: '100%' }}
      >
        Yes, delete everything!
      </button>
    </div>
  )
}

export default DelecteAccount
