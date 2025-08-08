import React, { useState } from "react";
import styled from "styled-components";

// === Estilos ===
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #ffcc00;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const Button = styled.button`
  background: #ffcc00;
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  margin: 1rem;

  &:hover {
    background: #e6b800;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: underline;

  &:hover {
    color: #ffcc00;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ $success }) => ($success ? "#00ff88" : "#ff5050")};
`;

// === Componente funcional ===
function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null); // null al inicio

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validación básica
    if (!form.name || !form.email || !form.phone) {
      setMessage("Por favor completa todos los campos.");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch("https://proyectojavic.onrender.com/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("¡Mensaje enviado con éxito!");
        setSuccess(true);
        setForm({ name: "", email: "", phone: "" });
      } else {
        setMessage("Error al enviar el formulario.");
        setSuccess(false);
      }
    } catch (error) {
      setMessage("Hubo un problema de conexión.");
      setSuccess(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Solicitar Cotización</Title>
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Enviar</Button>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
        {message && <Message $success={success}>{message}</Message>}
      </ModalContent>
    </ModalOverlay>
  );
}

export default ContactModal;
