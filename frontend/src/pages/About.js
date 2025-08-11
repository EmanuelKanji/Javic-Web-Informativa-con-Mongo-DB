import React, { useState } from "react";
import styled from "styled-components";
import aboutImage from "../assets/images/Quienes-Somos.jpg";

/**
 * Contenido estático. Si más adelante quieres administrarlo,
 * puedes mover esto a un contexto o cargarlo desde una API.
 */
const content = {
  historia:
    "Javic Ltda. es una empresa con sede en Calama, especializada en soluciones comunitarias y arriendo de maquinaria.",
  mision:
    "Brindar soluciones en arriendo de maquinaria con calidad y eficiencia.\nSer líderes en el sector, destacando por nuestra responsabilidad e innovación.",
  valores:
    "Compromiso: Cumplimos con nuestros clientes.\nIntegridad: Operamos con transparencia y honestidad.\nInnovación: Buscamos mejorar continuamente.",
};

/** Breakpoints de referencia (px) */
const BP_LG = 1024;
const BP_MD = 768;
const BP_SM = 480;

/* =========================================================================
   HERO (portada de la página About)
   -------------------------------------------------------------------------
   - Ocupa altura de pantalla (90vh) con imagen de fondo.
   - En móviles centramos el contenido y reducimos padding.
   - margin-top opcional para compensar navbar fijo (si defines --nav-h global).
   ========================================================================= */
const HeroContainer = styled.section`
  height: 90vh;
  margin-top: var(--nav-h, 0px);
  background-image: url(${aboutImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 2rem;
  color: #ffffff;

  @media (max-width: ${BP_MD}px) {
    justify-content: center;
    padding: 1rem;
  }
`;

/* =========================================================================
   TARJETA DE CONTENIDO
   -------------------------------------------------------------------------
   - Fondo semitransparente para contraste.
   - Altura mínima evita saltos al cambiar de sección.
   - En móviles se ensancha y centra el texto para legibilidad.
   ========================================================================= */
const HeroCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 3rem;
  border-radius: 12px;
  max-width: 600px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: ${BP_MD}px) {
    max-width: 90%;
    text-align: center;
    padding: 2rem;
  }

  @media (max-width: ${BP_SM}px) {
    max-width: 100%;
    padding: 1.25rem;
    border-radius: 10px;
  }
`;

/* =========================================================================
   TIPOGRAFÍA
   -------------------------------------------------------------------------
   - Título con acento dorado y sombra para destacar sobre la imagen.
   - Subtítulo con white-space: pre-line para respetar saltos manuales.
   - Escala responsiva en móviles.
   ========================================================================= */
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffcc00;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: ${BP_MD}px) {
    font-size: 2.1rem;
  }

  @media (max-width: ${BP_SM}px) {
    font-size: 1.9rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  line-height: 1.5;
  color: #ffffff;
  white-space: pre-line; /* respeta \n del contenido */
  flex: 1;

  @media (max-width: ${BP_MD}px) {
    font-size: 1.05rem;
  }

  @media (max-width: ${BP_SM}px) {
    font-size: 1rem;
  }
`;

/* =========================================================================
   ACCIONES (botones de sección)
   -------------------------------------------------------------------------
   - Disposición horizontal en desktop, vertical en móvil.
   - Los botones “activos” se ven distintos para ubicarse rápido.
   - Accesibilidad: aria-pressed en cada botón.
   ========================================================================= */
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${BP_MD}px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  background: ${(p) => (p.$active ? "#e6b800" : "#ffcc00")};
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: filter 0.2s ease, background 0.2s ease, transform 0.05s ease;

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: ${BP_MD}px) {
    width: 100%;
    font-size: 1.05rem;
    padding: 0.9rem 1.25rem;
  }

  @media (max-width: ${BP_SM}px) {
    font-size: 1rem;
    padding: 0.85rem 1rem;
    border-radius: 10px;
  }
`;

/**
 * About
 * ----------------------------------------------------------------------------
 * Página “Quiénes Somos” con tres secciones conmutables:
 * - historia, mision, valores
 * Mantiene estado local para cambiar el contenido sin recargar.
 */
function About() {
  const [activeSection, setActiveSection] = useState("historia");

  return (
    <>
      <HeroContainer>
        <HeroCard>
          <Title>
            {activeSection === "historia"
              ? "Nuestra Historia"
              : activeSection === "mision"
              ? "Misión y Visión"
              : "Nuestros Valores"}
          </Title>

          <Subtitle>{content[activeSection]}</Subtitle>

          <ButtonContainer role="group" aria-label="Cambiar sección">
            <Button
              onClick={() => setActiveSection("historia")}
              $active={activeSection === "historia"}
              aria-pressed={activeSection === "historia"}
            >
              Nuestra Historia
            </Button>
            <Button
              onClick={() => setActiveSection("mision")}
              $active={activeSection === "mision"}
              aria-pressed={activeSection === "mision"}
            >
              Misión y Visión
            </Button>
            <Button
              onClick={() => setActiveSection("valores")}
              $active={activeSection === "valores"}
              aria-pressed={activeSection === "valores"}
            >
              Nuestros Valores
            </Button>
          </ButtonContainer>
        </HeroCard>
      </HeroContainer>
    </>
  );
}

export default About;