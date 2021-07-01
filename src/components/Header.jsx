import React, { useContext, useState } from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'

import logo from '../images/diaryApp.png'
import { fb } from '../service/firebase'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { setUid, setPostNo, setUserName } = useContext(AuthContext)
  const [isLoading] = useState(false)
  const history = useHistory()

  const logoutHandler = () => {
    fb.auth.signOut()
    setUid('')
    setPostNo(0)
    setUserName('')
    history.push('/login')
  }

  const profileHandler = () => {
    history.push('/profile')
  }

  if (isLoading) return <div> </div>

  return (
    <Navbar
      className='navbar navbar-expand-lg navbar-light'
      style={{ backgroundColor: '#ffffff' }}
    >
      <Container>
        <NavLink
          exact={true}
          to='/entries'
          className='nav-link'
          style={{ marginLeft: '0', paddingLeft: '0' }}
        >
          <img
            src={logo}
            alt='diaryLogo'
            style={{ width: '50px', height: '50px' }}
          />
        </NavLink>
        <Nav className='me-auto' style={{ marginLeft: '3%' }}>
          <NavLink exact={true} to='/entries' className='nav-link'>
            All Entries
          </NavLink>
          <NavLink to='/create' className='nav-link'>
            New Entry
          </NavLink>
        </Nav>
        <Button className='btn btn-profile' onClick={profileHandler}>
          {localStorage.getItem('userName')}'s Profile
        </Button>
        <Button className='btn btn-primary' onClick={logoutHandler}>
          Logout
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header
