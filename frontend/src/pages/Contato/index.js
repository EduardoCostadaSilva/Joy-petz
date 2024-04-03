import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Body } from "./style";
import Navbar from "../../components/Navbar";

const Contato = () => {
  return (
    <Body>
      <Navbar />
      <h1>
        <LocalPhoneIcon sx={{ color: "#f34f8b" }} />
        Contato
      </h1>

      <h2>Se estiver com alguma dúvida,não hesite em nos contatar!</h2>
      <p>
        E-mail : suportejoypetz@gmail.com
      </p>
    </Body>
  );
};
export default Contato;
