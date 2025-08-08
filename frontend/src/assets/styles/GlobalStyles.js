import { createGlobalStyle } from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Oswald', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    text-transform: uppercase;
  }

  p {
    font-weight: 400;
  }

  nav ul li {
    list-style: none;
  }

  /* ✅ Asegurar que Swiper tenga tamaño */
  .swiper {
    width: 100%;
    height: auto;
    min-height: 100vh;
  }

  /* ✅ Hacer visibles las flechas */
  .swiper-button-prev,
  .swiper-button-next {
    color: white !important;
    font-size: 32px !important;
    z-index: 10;
    display: block !important;
    opacity: 1 !important;
  }

  .swiper-button-prev {
    left: 10px !important;
  }

  .swiper-button-next {
    right: 10px !important;
  }

  .swiper-pagination-bullet {
    background: #333 !important;
  }
`;

export default GlobalStyles;
