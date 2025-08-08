import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";  // ✅ Logo real de Javic

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.img`
  height: 60px; /* Ajustamos el tamaño para que se vea bien */
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #004080;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: 0.3s;

  &:hover {
    color: #ffcc00;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Link to="/">
        <Logo src={logo} alt="Javic Logo" />
      </Link>
      <NavLinks>
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/about">Quiénes Somos</NavLink></li>
        <li><NavLink to="/services">Servicios</NavLink></li>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
