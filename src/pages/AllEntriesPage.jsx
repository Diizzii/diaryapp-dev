import React from 'react'

import Header from '../components/Header'

import DUMMY_DATA from '../data/dummyData'
import Entry from '../components/Entry'

const AllEntriesPage = () => {
  const allEntries = DUMMY_DATA.map((entry) => {
    return <Entry key={entry.id} {...entry} />
  })

  return (
    <div>
      <Header />
      <div className='container'>{allEntries}</div>
    </div>
  )
}

export default AllEntriesPage
