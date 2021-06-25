import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../images/diaryApp.png'

const Header = () => {
  return (
    <Navbar
      className='navbar navbar-expand-lg navbar-light'
      style={{ backgroundColor: '#ffffff' }}
    >
      <Container>
        <NavLink exact={true} to='/' className='nav-link'>
          <img
            src={logo}
            alt='diaryLogo'
            style={{ width: '50px', height: '50px' }}
          />
        </NavLink>
        <Nav className='me-auto'>
          <NavLink exact={true} to='/' className='nav-link'>
            All Entries
          </NavLink>
          <NavLink to='/create' className='nav-link'>
            New Entry
          </NavLink>
        </Nav>
        <Button className='btn btn-primary'>Logout</Button>
      </Container>
    </Navbar>
  )
}

export default Header
