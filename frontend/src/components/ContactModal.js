import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #a71d2a;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: ${(props) => (props.$success ? "green" : "red")};
  text-align: center;
`;

function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.telefono || !form.mensaje) {
      setMessage("Por favor completa todos los campos.");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch("https://proyectojavic.onrender.com/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setMessage("¡Mensaje enviado con éxito!");
        setSuccess(true);
        setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
      } else {
        setMessage(result?.message || "Error al enviar el formulario.");
        setSuccess(false);
      }
    } catch (err) {
      setMessage("Hubo un problema de conexión.");
      setSuccess(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Solicitar Cotización</Title>

        <Input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <Input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />

        {/* agrega un textarea para el mensaje */}
        <Input
          as="textarea"
          rows="4"
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          style={{ resize: "vertical" }}
        />

        <Button onClick={handleSubmit}>Enviar</Button>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
        {message && <Message $success={success}>{message}</Message>}
      </ModalContent>
    </ModalOverlay>
  );
}

export default ContactModal;