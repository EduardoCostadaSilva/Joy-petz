import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { isAuthenticated } from "./services/auth";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/Usuarios";
import Animal from "./pages/Animal";
import Contato from "./pages/Contato";
import QuemSomos from "./pages/QuemSomos";
import Perfil from "./pages/Perfil";

const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const UsuariosPage = () => <Usuarios />;
const ContatoPage = () => <Contato />;
const AnimalPage = () => <Animal />;
const QuemSomosPage = () => <QuemSomos />;
const PerfilPage = () => <Perfil/>;
const NotFoundPage = () => <h1>Página não encontrada.</h1>;
const AppPage = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <MainPage />;
};

const Rotas = () => (
  <Router>
   
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<MainPage/>} />
      <Route path="/logout" element={<SignUpPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/doar" element={<AnimalPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/sobre" element={<QuemSomosPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default Rotas;
