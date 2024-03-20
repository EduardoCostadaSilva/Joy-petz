import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import Login from "./pages/Login";

const LoginPage = () => <Login />;
const Rotas = () => (
 <Router>
 <Routes>
 <Route path="/" element={<LoginPage />} />
 </Routes>
 </Router>
);
export default Rotas;