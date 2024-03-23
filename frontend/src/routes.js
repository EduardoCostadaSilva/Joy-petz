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
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/Usuarios";
import Animal from "./pages/Animal";
import Navbar from "./components/Navbar";


const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const UsuariosPage = () => <Usuarios />;
const AnimalPage = () => <Animal />;
const LogOutPage = () => <Logout />;
const NotFoundPage = () => <h1>Página não encontrada.</h1>;
const AppPage = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <MainPage />;
};

const Rotas = () => (
  <Router>
   <Navbar />
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/home" element={<MainPage/>} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/logout" element={<LogOutPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/doar" element={<AnimalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default Rotas;
