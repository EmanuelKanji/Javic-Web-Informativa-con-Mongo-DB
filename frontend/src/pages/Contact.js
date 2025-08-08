import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaPaperPlane } from 'react-icons/fa';

const PageContainer = styled(motion.div)`
  height: 100vh;
  background: linear-gradient(135deg, #004080, #0066cc);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormContainer = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #004080;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 0.8rem;
`;

const Icon = styled.div`
  margin-right: 0.8rem;
  color: #004080;
  font-size: 1.2rem;
`;

const Input = styled(motion.input)`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  color: #333;
`;

const TextArea = styled(motion.textarea)`
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  resize: none;

  &:focus {
    border-color: #004080;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem;
  background: linear-gradient(135deg, #004080, #0066cc);
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #0050a0, #0078e0);
  }
`;

function Contact() {
  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <FormContainer>
        <Title>Contáctanos</Title>
        <Form>
          <InputGroup>
            <Icon><FaUser /></Icon>
            <Input type="text" placeholder="Nombre completo" />
          </InputGroup>
          <InputGroup>
            <Icon><FaEnvelope /></Icon>
            <Input type="email" placeholder="Correo electrónico" />
          </InputGroup>
          <TextArea rows="5" placeholder="Escribe tu mensaje aquí..." />
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane /> Enviar
          </Button>
        </Form>
      </FormContainer>
    </PageContainer>
  );
}

export default Contact;
