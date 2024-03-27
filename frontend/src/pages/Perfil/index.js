import React from "react";
import { Body } from "./style";
import Navbar from "../../components/Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Perfil = () => {
  return (
    <Body>
      <Navbar />

      <h1>
        <AccountCircleIcon sx={{ color: "#f34f8b" }} />
        Seu Perfil
      </h1>

      <h2>Suas Publicações</h2>
    </Body>
  );
};
export default Perfil;
