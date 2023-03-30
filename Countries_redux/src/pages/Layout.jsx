import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet } from 'react-router-dom'
import { auth, logout } from '../auth/firebase'

const Layout = () => {
  const [user] = useAuthState(auth)
  return (
    <Container fluid>
      <Row>
        <Navbar  variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
          {user && (
            <>
              <h6 className="m-1">Hello, {user.email}!</h6>
              <button
                onClick={() => logout()}
                className="px-4 py-2 mr-2 text-sm font-medium text-black "
              >
                SignOut
              </button>
            </>
          )}
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  )
}

export default Layout
