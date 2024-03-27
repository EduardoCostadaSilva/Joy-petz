import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import { Body } from "./style";
import Navbar from "../../components/Navbar";

const QuemSomos = () => {
  return (
    <Body>
      <Navbar />
      <h1>
        <PeopleIcon sx={{ color: "#f34f8b" }} />
        Quem Somos
      </h1>

      <h2>Bem-vindo ao JoyPetz - Onde cada patinha encontra um lar feliz!</h2>
      <p>
        Com o abandono de animais cada vez mais recorrente,a Joypetz tem como
        objetivo ajudar na adoção de pets,intermediando a comunicação da pessoa
        que pode disponibilizar animais para a adoção e a pessoa que quer adotar
        o animal.
      </p>
    </Body>
  );
};
export default QuemSomos;
