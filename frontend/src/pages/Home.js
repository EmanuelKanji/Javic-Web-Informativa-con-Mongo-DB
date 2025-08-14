import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/images/Arriendo-Maquinaria.jpg";
import ContactModal from "../components/ContactModal";

/**
 * Breakpoints de referencia:
 * - 1024px: laptops / tablets en landscape
 * - 768px: tablets / móviles grandes
 * - 480px: móviles pequeños
 */
const BP_LG = 1024;
const BP_MD = 768;
const BP_SM = 480;

/* =========================================================================
   HERO (sección de portada)
   -------------------------------------------------------------------------
   - Altura relativa a la ventana (vh) para ocupar pantalla.
   - Padding generoso en desktop; más compacto en móvil.
   - En ≤768px centramos el contenido para mejor legibilidad.
   - Si tu navbar fijo tapa parte del hero, puedes definir en global:
       :root { --nav-h: 72px; }
     y acá respetará ese alto sin “mover” nada cuando no exista.
   ========================================================================= */
const HeroContainer = styled.div`
  min-height: 90vh;
  margin-top: var(--nav-h, 0px);
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 2rem;
  color: white;

  @media (max-width: ${BP_LG}px) {
    padding: 1.5rem;
  }

  @media (max-width: ${BP_MD}px) {
    justify-content: center;
    min-height: 90vh; // <-- Cambiado de 80vh a 90vh
    padding: 1rem;
  }

  @media (max-width: ${BP_SM}px) {
    min-height: 90vh; // <-- Cambiado de 70vh a 90vh
    padding: 0.75rem;
  }
`;

/* =========================================================================
   TARJETA DEL HERO
   -------------------------------------------------------------------------
   - Fondo semi-transparente para contraste sobre la foto.
   - Ancho máximo en desktop; en móvil se hace fluido y centra texto.
   - Ajustes finos de padding en breakpoints.
   ========================================================================= */
const HeroCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;

  @media (max-width: ${BP_LG}px) {
    max-width: 420px;
  }

  @media (max-width: ${BP_MD}px) {
    max-width: 90%;
    text-align: center;
    padding: 1.5rem;
  }

  @media (max-width: ${BP_SM}px) {
    max-width: 100%;
    padding: 1rem;
    border-radius: 10px;
  }
`;

/* =========================================================================
   TIPOGRAFÍA
   -------------------------------------------------------------------------
   - Escala fluida: reducimos tamaño en pantallas pequeñas para mantener
     jerarquía y evitar saltos de línea incómodos.
   ========================================================================= */
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: ${BP_LG}px) {
    font-size: 2.25rem;
  }
  @media (max-width: ${BP_MD}px) {
    font-size: 2rem;
  }
  @media (max-width: ${BP_SM}px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;

  @media (max-width: ${BP_LG}px) {
    font-size: 1.1rem;
  }
  @media (max-width: ${BP_MD}px) {
    font-size: 1rem;
  }
  @media (max-width: ${BP_SM}px) {
    font-size: 0.95rem;
  }
`;

/* =========================================================================
   CTA (botón de acción)
   -------------------------------------------------------------------------
   - Mantiene paleta corporativa (#ffcc00).
   - En móvil se puede hacer full-width para mejor toque.
   ========================================================================= */
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

  @media (max-width: ${BP_MD}px) {
    padding: 0.9rem 1.5rem;
    font-size: 1.05rem;
  }
  @media (max-width: ${BP_SM}px) {
    width: 100%;
    padding: 0.85rem 1.25rem;
    font-size: 1rem;
  }
`;

/**
 * Home
 * --------------------------------------------------------------------------
 * - Página de inicio con hero gráfico y CTA que abre el modal de contacto.
 * - La lógica se mantiene minimal: estado local para mostrar/ocultar modal.
 * - Si en el futuro agregas ContentContext, reemplaza el objeto `content`.
 */
function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  // Contenido estático (puede venir de contexto o API luego)
  const content = {
    homeTitle: "Bienvenido a Javic",
    homeSubtitle: "Arriendo de maquinaria y servicios a la comunidad",
  };

  return (
    <>
      <HeroContainer>
        <HeroCard>
          <Title>{content.homeTitle}</Title>
          <Subtitle>{content.homeSubtitle}</Subtitle>
          <Button onClick={() => setModalOpen(true)} aria-haspopup="dialog">
            Cotizar Ahora
          </Button>
        </HeroCard>
      </HeroContainer>

      {/* Modal de contacto: mantenemos compatibilidad con isOpen/open */}
      <ContactModal
        isOpen={isModalOpen}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default Home;
