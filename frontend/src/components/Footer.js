/**
 * Footer (Pie de página)
 * --------------------------------------------------------------------------
 * - Pie de página compacto y responsivo con enlaces internos y redes sociales.
 * - Fondo corporativo azul, texto blanco y acento dorado en hover.
 * - Adaptable a pantallas pequeñas (columnas y espacio entre elementos).
 * - Muestra el año actual y aviso de derechos reservados.
 */

/* =========================
   IMPORTS
   ========================= */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";  // Iconos de redes

/* =========================
   CONTENEDOR PRINCIPAL
   ========================= */
const FooterContainer = styled.footer`
  background: #004080;
  color: white;
  padding: 1rem 0;
  text-align: center;
`;

/* =========================
   CONTENIDO DEL FOOTER
   - Layout flexible y responsivo
   ========================= */
const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

/* =========================
   ENLACES INTERNOS
   - Navegación principal
   ========================= */
const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
`;

/* =========================
   ICONOS DE REDES SOCIALES
   ========================= */
const SocialIcons = styled.div`
  display: flex;
  gap: 0.8rem;
  
  svg {
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
`;

/* =========================
   COPYRIGHT
   - Año actual y derechos reservados
   ========================= */
const Copyright = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

/* =========================
   COMPONENTE PRINCIPAL
   ========================= */
function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Enlaces internos */}
        <FooterLinks>
          <Link to="/">Inicio</Link>
          <Link to="/about">Quienes Somos</Link>
          <Link to="/services">Servicios</Link>
        </FooterLinks>

        {/* Redes Sociales */}
        <SocialIcons>
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
        </SocialIcons>
      </FooterContent>

      {/* Derechos Reservados */}
      <Copyright>© {new Date().getFullYear()} Javic Ltda. Todos los derechos reservados.</Copyright>
    </FooterContainer>
  );
}

export default Footer;
