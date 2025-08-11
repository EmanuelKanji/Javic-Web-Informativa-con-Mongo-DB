import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// === Estilos ===
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 520px;
  background: #0b0b0b;
  color: #f7f7f7;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,.6);
  border: 1px solid rgba(255,255,255,.1);
  padding: 20px;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
  color: #fff;
  font-size: .95rem;
  &:focus { outline: 2px solid #5b9cff; outline-offset: 2px; }
  &::placeholder { color: #9aa4b2; }
`;

const Button = styled.button`
  appearance: none;
  border: 0;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  background: #5b9cff;
  color: #0b0b0b;
  margin-right: 8px;
  &:hover { filter: brightness(1.08); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

const CloseButton = styled.button`
  appearance: none;
  border: 1px solid rgba(255,255,255,.12);
  background: transparent;
  color: #d6d6d6;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,.06); }
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: .9rem;
  color: ${props => props.$success ? "#5fe3a1" : "#ff6b6b"};
`;

function ContactModal({ isOpen, open, onClose }) {
  const visible = typeof isOpen !== "undefined" ? isOpen : !!open;

  // solo 3 campos
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);

  // ESC + bloquear scroll (hook antes del return condicional)
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (message) { setMessage(""); setSuccess(null); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación con trim
    const nombre = form.nombre.trim();
    const email = form.email.trim();
    const telefono = form.telefono.trim();

    if (!nombre || !email || !telefono) {
      setMessage("Por favor completa todos los campos.");
      setSuccess(false);
      return;
    }

    const emailOk = /^(?:[a-zA-Z0-9_'^&+%\-]+(?:\.[a-zA-Z0-9_'^&+%\-]+)*|\".+\")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
    if (!emailOk) {
      setMessage("Escribe un correo válido.");
      setSuccess(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://proyectojavic.onrender.com/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setMessage("¡Mensaje enviado con éxito!");
        setSuccess(true);
        setForm({ nombre: "", email: "", telefono: "" });
      } else {
        setMessage(result?.message || "Error al enviar el formulario.");
        setSuccess(false);
      }
    } catch (err) {
      setMessage("Hubo un problema de conexión.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent ref={dialogRef} onClick={(e) => e.stopPropagation()}>
        <Title>Solicitar Cotización</Title>

        {/* form para submit y preventDefault */}
        <form onSubmit={handleSubmit} noValidate>
          <Input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            autoComplete="name"
          />
          <Input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <Input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            autoComplete="tel"
          />

          <div style={{ marginTop: 6 }}>
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </Button>
            <CloseButton type="button" onClick={onClose}>Cerrar</CloseButton>
          </div>
        </form>

        {message && <Message $success={success}>{message}</Message>}
      </ModalContent>
    </ModalOverlay>
  );
}

export default ContactModal;
