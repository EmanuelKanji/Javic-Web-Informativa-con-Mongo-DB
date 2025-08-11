import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";  // Logo de Javic

/**
 * Breakpoint principal (px) para alternar entre vista desktop y móvil.
 * - ≤ 768px: ocultamos los links de escritorio y mostramos el menú móvil (hamburguesa + panel).
 * - > 768px: navbar tradicional con links visibles.
 */
const BREAKPOINT = 768;

/* =========================
   CONTENEDOR DEL NAVBAR
   -------------------------
   - Fijo arriba con sombra sutil
   - Padding responsivo en móvil
   ========================= */
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
  z-index: 1000; /* por sobre el contenido */

  @media (max-width: ${BREAKPOINT}px) {
    /* Compacto en pantallas pequeñas */
    padding: 0.75rem 1rem;
  }
`;

/* =========================
   LOGO
   -------------------------
   - Altura levemente menor en móvil
   ========================= */
const Logo = styled.img`
  height: 60px;
  cursor: pointer;

  @media (max-width: ${BREAKPOINT}px) {
    height: 52px;
  }
`;

/* =========================
   LINKS (ESCRITORIO)
   -------------------------
   - Ocultos en móvil (se muestra el menú desplegable)
   ========================= */
const NavLinks = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${BREAKPOINT}px) {
    display: none; /* oculto en móvil */
  }
`;

/* =========================
   LINK INDIVIDUAL (ESCRITORIO)
   -------------------------
   - Color corporativo
   - Hover a color de acento
   ========================= */
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

/* =========================
   BOTÓN HAMBURGUESA (MÓVIL)
   -------------------------
   - Solo visible en ≤ 768px
   - Botón accesible (aria-* se setea en el JSX)
   ========================= */
const Burger = styled.button`
  display: none;

  @media (max-width: ${BREAKPOINT}px) {
    display: inline-flex;
  }

  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.08);
  background: white;
  color: #004080;
  cursor: pointer;
`;

/* =========================
   OVERLAY OSCURO (MÓVIL)
   -------------------------
   - Cubre la pantalla cuando el menú está abierto
   - Cierra el menú al clickear fuera (onClick en JSX)
   ========================= */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  opacity: ${p => (p.$open ? 1 : 0)};
  pointer-events: ${p => (p.$open ? "auto" : "none")};
  transition: opacity 200ms ease;
  z-index: 999; /* por debajo del panel del menú */
`;

/* =========================
   PANEL DE MENÚ MÓVIL
   -------------------------
   - Despliega desde arriba con transición
   - Oculto en desktop
   ========================= */
const MobileMenu = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(${p => (p.$open ? "0%" : "-110%")});
  transition: transform 220ms ease;
  z-index: 1000;

  @media (min-width: ${BREAKPOINT + 1}px) {
    display: none; /* solo móvil */
  }
`;

/* =========================
   CABECERA DEL MENÚ MÓVIL
   -------------------------
   - Título y botón para cerrar
   ========================= */
const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
`;

/* =========================
   LISTA DE OPCIONES (MÓVIL)
   ========================= */
const MobileList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px 8px 12px;
  display: flex;
  flex-direction: column;
`;

const MobileItem = styled.li`
  margin: 4px 0;
`;

/* =========================
   LINK INDIVIDUAL (MÓVIL)
   -------------------------
   - Área táctil amplia
   - Hover con fondo suave y color de acento
   ========================= */
const MobileLink = styled(Link)`
  display: block;
  padding: 12px 10px;
  border-radius: 10px;
  color: #004080;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: #f5f7fb;
    color: #ffcc00;
  }
`;

/**
 * Ícono de hamburguesa en SVG:
 * - Tres líneas en modo "cerrado"
 * - Cruz (X) en modo "abierto"
 * - Marcado aria-hidden para lectores de pantalla (el <button> ya tiene etiqueta)
 */
const BurgerIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={open ? "M6 6L18 18M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Navbar
 * ----------------------------------------------------------------------------
 * Componente de navegación fijo con:
 * - Vista de escritorio: logo + links (Inicio, Quiénes Somos, Servicios).
 * - Vista móvil: botón hamburguesa que despliega un panel superior con las
 *   mismas opciones. Overlay para cerrar tocando fuera.
 *
 * Accesibilidad:
 * - Botones con aria-label y estados aria-expanded/aria-controls.
 * - Overlay clickeable para cerrar sin precisar targets pequeños.
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  /** Cierra el menú móvil. Se usa en overlay y en cada link móvil. */
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Barra fija superior */}
      <NavbarContainer>
        {/* Logo / Home */}
        <Link to="/" aria-label="Ir al inicio">
          <Logo src={logo} alt="Javic Logo" />
        </Link>

        {/* Links de escritorio (ocultos en móvil) */}
        <NavLinks>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/about">Quiénes Somos</NavLink></li>
          <li><NavLink to="/services">Servicios</NavLink></li>
        </NavLinks>

        {/* Botón hamburguesa (visible solo en móvil) */}
        <Burger
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <BurgerIcon open={menuOpen} />
        </Burger>
      </NavbarContainer>

      {/* Overlay oscurecido: clic para cerrar */}
      <Overlay $open={menuOpen} onClick={closeMenu} />

      {/* Panel deslizante con las opciones en móvil */}
      <MobileMenu id="mobile-menu" $open={menuOpen} role="menu" aria-hidden={!menuOpen}>
        <MobileHeader>
          <strong style={{ color: "#004080" }}>Menú</strong>
          <Burger aria-label="Cerrar" onClick={closeMenu}>
            <BurgerIcon open />
          </Burger>
        </MobileHeader>

        <MobileList>
          <MobileItem><MobileLink to="/" onClick={closeMenu}>Inicio</MobileLink></MobileItem>
          <MobileItem><MobileLink to="/about" onClick={closeMenu}>Quiénes Somos</MobileLink></MobileItem>
          <MobileItem><MobileLink to="/services" onClick={closeMenu}>Servicios</MobileLink></MobileItem>
        </MobileList>
      </MobileMenu>
    </>
  );
}

export default Navbar;