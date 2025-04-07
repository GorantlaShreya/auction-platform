import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; 
import "./style.css"; 

const MyNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/">⚖️ Auction</Navbar.Brand>
        <Form className="d-flex mx-auto">
          <FormControl type="search" placeholder="Search..." className="me-2" />
          <Button variant="outline-light">🔍︎</Button>
        </Form>
        <Nav>
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Dropdown align="end">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FaUser size={22} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/signin">Sign In</Dropdown.Item>
              <Dropdown.Item as={Link} to="/signup">Sign Up</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
