import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";  // ✅ Iconos de redes

const FooterContainer = styled.footer`
  background: #004080;
  color: white;
  padding: 1rem 0;  /* 📌 Menos padding para hacerlo más compacto */
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.5rem 1rem;  /* 📌 Ajuste para hacerlo más delgado */
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;  /* 📌 Texto más pequeño */
    transition: 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.8rem;
  
  svg {
    font-size: 1.2rem;  /* 📌 Íconos más pequeños */
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
`;

const Copyright = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;  /* 📌 Texto más pequeño */
  opacity: 0.7;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* ✅ Enlaces */}
        <FooterLinks>
          <Link to="/">Inicio</Link>
          <Link to="/about">Quienes Somos</Link>
          <Link to="/services">Servicios</Link>
        </FooterLinks>

        {/* ✅ Redes Sociales */}
        <SocialIcons>
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
        </SocialIcons>
      </FooterContent>

      {/* ✅ Derechos Reservados */}
      <Copyright>© {new Date().getFullYear()} Javic Ltda. Todos los derechos reservados.</Copyright>
    </FooterContainer>
  );
}

export default Footer;
