import React, { useState } from "react";
import { Container, Form } from "./style";
import Logo from "../../assets/senac.png";
import { useHistory } from "react-router-dom"; // Mudança de useNavigate para useHistory
import api from "../../services/api";

const Contato = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const history = useHistory(); // Usando useHistory em vez de useNavigate

  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    if (!email || !mensagem) {
      setError("Preencha o email e a mensagem para enviar!");
      return;
    }
    try {
      // Envie a mensagem para o backend
      await api.post("/enviar-mensagem", { email, mensagem });
      // Redirecionar após o envio bem-sucedido
      history.push("/mensagem-enviada");
    } catch (err) {
      setError("Houve um problema ao enviar a mensagem. Por favor, tente novamente mais tarde!");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleEnviarMensagem}>
        <img src={Logo} alt="Logo SENAC" />
        <input
          type="email"
          placeholder="Endereço de Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        ></textarea>
        <button type="submit">Enviar</button>
        {error && <p>{error}</p>}
      </Form>
    </Container>
  );
};

export default Contato;
