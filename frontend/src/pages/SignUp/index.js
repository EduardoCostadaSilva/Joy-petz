import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignUp = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !tipo) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        await api.post("/signup", { nome, email, senha, tipo });
        navigate("/");
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao registrar sua conta.");
      }
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <AccountCircleIcon
          sx={{
            fontSize: 300,
            color:" #f34f8b",
          }}
        ></AccountCircleIcon>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Endereço de email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tipo de Acesso"
          onChange={(e) => setTipo(e.target.value)}
        />
        <button type="submit">Cadastro de Usuário</button>
        <Link to="/">Fazer Login</Link>
      </Form>
    </Container>
  );
};
export default SignUp;
