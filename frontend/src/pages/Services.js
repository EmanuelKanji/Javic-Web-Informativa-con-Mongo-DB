import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import backgroundImage from "../assets/images/Servicios.jpg";

/**
 * Breakpoints de referencia (px):
 * - 1200: desktops amplios
 * - 1024: laptops / tablets landscape
 * - 768 : tablets / móviles grandes
 * - 480 : móviles pequeños
 */
const BP_XL = 1200;
const BP_LG = 1024;
const BP_MD = 768;
const BP_SM = 480;

/* =========================================================================
   CONTENEDOR PRINCIPAL
   -------------------------------------------------------------------------
   - Ocupa la altura de la ventana (min-height) y centra contenido.
   - Imagen de fondo con "cover"; parallax (attachment: fixed) solo en desktop
     por performance y compatibilidad (iOS/Android suelen ignorarlo).
   - Padding responsivo para respiración adecuada en pantallas pequeñas.
   ========================================================================= */
const ServicesContainer = styled.section`
  width: 100%;
  min-height: 90vh;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* efecto parallax en desktop */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2rem;
  color: #ffffff;
  text-align: center;

  @media (max-width: ${BP_LG}px) {
    background-attachment: scroll; /* desactiva parallax por compatibilidad */
    min-height: 90vh;
    padding: 4rem 1rem;
  }

  @media (max-width: ${BP_MD}px) {
    background-attachment: scroll;
    min-height: 90vh;
    padding: 3rem 1rem;
  }
`;

/* =========================================================================
   TARJETA CONTENEDORA
   -------------------------------------------------------------------------
   - Fondo semitransparente para contraste.
   - Ancho máximo cómodo; fluido en tablet/móvil.
   ========================================================================= */
const ServicesCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
  max-width: 900px; /* un pelín más ancho para 3 columnas */
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${BP_MD}px) {
    max-width: 92%;
    padding: 1.5rem;
  }

  @media (max-width: ${BP_SM}px) {
    max-width: 100%;
    padding: 1.25rem;
    border-radius: 10px;
  }
`;

/* =========================================================================
   TÍTULO
   -------------------------------------------------------------------------
   - Tipografía con sombra sutil para legibilidad sobre imagen.
   - Escala responsiva.
   ========================================================================= */
const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #ffcc00;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin: 0 0 1rem 0;
  font-family: "Poppins", sans-serif;

  @media (max-width: ${BP_LG}px) {
    font-size: 2.5rem;
  }
  @media (max-width: ${BP_MD}px) {
    font-size: 2.15rem;
  }
  @media (max-width: ${BP_SM}px) {
    font-size: 1.9rem;
  }
`;

/* =========================================================================
   GRID DE SERVICIOS
   -------------------------------------------------------------------------
   - Columna única por defecto (mobile-first).
   - A partir de 768px, 3 columnas iguales.
   - Gap más generoso en desktop.
   ========================================================================= */
const ServicesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2rem;

  @media (min-width: ${BP_MD}px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;

    @media (min-width: ${BP_XL}px) {
      gap: 2rem;
    }
  }
`;

/* =========================================================================
   CARD DE SERVICIO
   -------------------------------------------------------------------------
   - Color corporativo con alto contraste.
   - Animación de "scale" al hover (solo en dispositivos con hover).
   - Estados de foco visibles para accesibilidad con teclado.
   ========================================================================= */
const ServiceCard = styled(motion.div)`
  background: rgba(255, 204, 0, 0.85);
  padding: 1.5rem;
  border-radius: 10px;
  color: #333;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  outline: none;

  /* Hover/Focus: solo en dispositivos con hover para evitar "saltos" en touch */
  @media (hover: hover) {
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
    }
  }

  &:focus-visible {
    /* Indicador de foco accesible */
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.55), 0 10px 24px rgba(0, 0, 0, 0.25);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;

    @media (max-width: ${BP_SM}px) {
      font-size: 1.35rem;
    }
  }

  p {
    font-size: 1.1rem;
    margin: 0;

    @media (max-width: ${BP_SM}px) {
      font-size: 1rem;
    }
  }
`;

// ----- Componente -----
// Mantengo tu lógica: "content" como estado local (podría ser estático o venir de API/contexto)
function Services() {
  const [content] = useState({
    servicesTitle: "Nuestros Servicios",
    service1Title: "Arriendo de Maquinaria",
    service1Desc: "Contamos con maquinaria de alta calidad para diversos proyectos.",
    service2Title: "Asesoría Técnica",
    service2Desc: "Brindamos asesoría para la selección y uso de equipos.",
    service3Title: "Mantenimiento",
    service3Desc: "Servicio de mantenimiento para garantizar el rendimiento de los equipos.",
  });

  return (
    <ServicesContainer aria-labelledby="services-title">
      <ServicesCard>
        <Title id="services-title">{content.servicesTitle}</Title>

        <ServicesGrid>
          {/* 
            Framer Motion:
            - whileHover: escalado suave (en touch no aplica por media query).
            - whileTap: feedback en dispositivos táctiles.
          */}
          <ServiceCard
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            tabIndex={0} /* foco accesible con teclado */
          >
            <h3>{content.service1Title}</h3>
            <p>{content.service1Desc}</p>
          </ServiceCard>

          <ServiceCard
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            tabIndex={0}
          >
            <h3>{content.service2Title}</h3>
            <p>{content.service2Desc}</p>
          </ServiceCard>

          <ServiceCard
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            tabIndex={0}
          >
            <h3>{content.service3Title}</h3>
            <p>{content.service3Desc}</p>
          </ServiceCard>
        </ServicesGrid>
      </ServicesCard>
    </ServicesContainer>
  );
}

export default Services;
