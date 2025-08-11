import React, { useState, useContext } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/images/Arriendo-Maquinaria.jpg";
import ContactModal from "../components/ContactModal";

const HeroContainer = styled.div`
  height: 90vh;
  background-image: url(${backgroundImage});
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
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 90%;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: #ffcc00;
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: 0.3s;

  &:hover {
    background: #e6b800;
  }
`;

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <HeroContainer>
        <HeroCard>
          <Title>{content.homeTitle}</Title>
          <Subtitle>{content.homeSubtitle}</Subtitle>
          <Button onClick={() => setModalOpen(true)}>Cotizar Ahora</Button>
        </HeroCard>
      </HeroContainer>

      <ContactModal
        isOpen={isModalOpen}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default Home;
