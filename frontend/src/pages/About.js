import React, { useState } from "react";
import styled from "styled-components";
import aboutImage from "../assets/images/Quienes-Somos.jpg";

const content = {
  historia: "Javic Ltda. es una empresa con sede en Calama, especializada en soluciones comunitarias y arriendo de maquinaria.",
  mision: "Brindar soluciones en arriendo de maquinaria con calidad y eficiencia.\nSer líderes en el sector, destacando por nuestra responsabilidad e innovación.",
  valores: "Compromiso: Cumplimos con nuestros clientes.\nIntegridad: Operamos con transparencia y honestidad.\nInnovación: Buscamos mejorar continuamente."
};

const HeroContainer = styled.div`
  height: 90vh; /* Similar al diseño de Home.js */
  background-image: url(${aboutImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  color: white;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 1rem;
  }
`;

const HeroCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 3rem;
  border-radius: 12px;
  max-width: 600px;
  min-height: 300px; /* Establece una altura mínima para evitar cambios de forma */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    max-width: 90%;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffcc00; /* Acento dorado */
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Sombra para destacar */
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  line-height: 1.5;
  color: #ffffff; /* Texto blanco para contraste */
  white-space: pre-line;
  flex: 1; /* Asegura que el texto ocupe el espacio disponible */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  background: #ffcc00;
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e6b800;
  }
`;

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
          <ButtonContainer>
            <Button onClick={() => setActiveSection("historia")}>
              Nuestra Historia
            </Button>
            <Button onClick={() => setActiveSection("mision")}>
              Misión y Visión
            </Button>
            <Button onClick={() => setActiveSection("valores")}>
              Nuestros Valores
            </Button>
          </ButtonContainer>
        </HeroCard>
      </HeroContainer>
    </>
  );
}

export default About;
