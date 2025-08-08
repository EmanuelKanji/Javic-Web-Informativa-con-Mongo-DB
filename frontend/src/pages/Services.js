import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import backgroundImage from "../assets/images/Servicios.jpg";

// ----- Estilos -----
const ServicesContainer = styled.div`
  width: 100%;
  min-height: 90vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
  text-align: center;

  @media (max-width: 1024px) {
    background-attachment: scroll;
    min-height: 90vh;
    padding: 4rem 1rem;
  }

  @media (max-width: 768px) {
    background-size: cover;
    background-position: center;
    background-attachment: scroll;
    min-height: 90vh;
    padding: 3rem 1rem;
  }
`;

const ServicesCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #ffcc00;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const ServicesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 204, 0, 0.8);
  padding: 1.5rem;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  color: #333;
  font-family: 'Poppins', sans-serif;

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
  }
`;

// ----- Componente -----
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
    <ServicesContainer>
      <ServicesCard>
        <Title>{content.servicesTitle}</Title>
        <ServicesGrid>
          <ServiceCard whileHover={{ scale: 1.1 }}>
            <h3>{content.service1Title}</h3>
            <p>{content.service1Desc}</p>
          </ServiceCard>
          <ServiceCard whileHover={{ scale: 1.1 }}>
            <h3>{content.service2Title}</h3>
            <p>{content.service2Desc}</p>
          </ServiceCard>
          <ServiceCard whileHover={{ scale: 1.1 }}>
            <h3>{content.service3Title}</h3>
            <p>{content.service3Desc}</p>
          </ServiceCard>
        </ServicesGrid>
      </ServicesCard>
    </ServicesContainer>
  );
}

export default Services;
