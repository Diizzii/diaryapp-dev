import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

const NavbarComp = () => {
  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>diaryApp</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/'>All Entries</Nav.Link>
          <Nav.Link href='/create'>New Entry</Nav.Link>
        </Nav>
        <Button className='btn btn-secondary'>Logout</Button>
      </Container>
    </Navbar>
  )
}

export default NavbarComp
