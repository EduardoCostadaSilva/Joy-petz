import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Container, Form } from "./style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SignUp from "../SignUp";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha email e senha para continuar!");
      return;
    }
    try {
      const response = await api.post("/signin", { email, senha });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/app");
    } catch (err) {
      setError("Houve um problema com o login, verifique suas credenciais!!");
    }
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSignIn}>
          <AccountCircleIcon
            sx={{
              fontSize: 300,
              color:" #f34f8b",
            }}
          ></AccountCircleIcon>

          <input
            type="email"
            placeholder="Endereço de Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>

          <Link to="/logout">Se cadastrar</Link>
          {error && <p>{error}</p>}
        </Form>
      </Container>
    </>
  );
};
export default SignIn;
