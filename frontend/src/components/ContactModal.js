import React, { useState } from "react";
import styled from "styled-components";

// ... (estilos iguales)

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
