import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;

    navigate(`/search/${searchTerm}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container expand="sm">
        <Navbar.Brand href="/">DizMeteo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/healthtravel/Almaty">Health and events</Nav.Link>
            <Nav.Link href="/playground">PlayGround</Nav.Link>
            <NavDropdown title="Погода" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/search/Almaty">Today</NavDropdown.Item>
              <NavDropdown.Item href="/hourly/Almaty">
                3 hourly
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              type="search"
              name="searchTerm"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-success">Search city</Button>
            <Nav.Link href="/reg" style={{margin: '0 2vw'}}>Register</Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;