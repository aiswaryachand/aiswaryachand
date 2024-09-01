import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Navbar.css"; // Custom CSS if needed

export const NavbarComponent = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "", { path: "/" });
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
        <Nav className="mx-auto nav-links">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/create-recipe" className="nav-link">Create Recipe</Nav.Link>
          <Nav.Link as={Link} to="/chart" className="nav-link">Chart</Nav.Link>
          <Nav.Link as={Link} to="/saved-recipes" className="nav-link">Saved Recipes</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {!cookies.access_token ? (
            <Nav.Link as={Link} to="/auth">Login/Register</Nav.Link>
          ) : (
            <Button variant="danger" onClick={logout}>Logout</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
