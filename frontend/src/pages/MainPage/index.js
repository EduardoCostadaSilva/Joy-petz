import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";
import Logo from "../../img/logo_joypetz.png";
import { A, DIV, H2, P, UL } from "./style";
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const MainPage = () => {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  // useEffect(() => {
  //   const fetchAnimais = async () => {
  //     try {
  //       const response = await axios.get("/animais"); // Faz a solicitação GET para /animais
  //       setAnimais(response.data); // Define os animais retornados no estado
  //       setLoading(false); // Define loading como falso após a conclusão da solicitação
  //     } catch (error) {
  //       console.error("Erro ao buscar animais:", error);
  //       setLoading(false); // Define loading como falso em caso de erro
  //     }
  //   };

  //   fetchAnimais(); // Chama a função de busca de animais ao montar o componente
  // }, []); // O array vazio [] assegura que useEffect será chamado apenas uma vez após a montagem do componente

  useEffect(() => {
    async function getData() {
      const response = await api.get("/animais");
      setAnimais(response.data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <p>Carregando animais...</p>;
  }

  return (
    <div>
      <Navbar />
      <h2>Lista de Animais</h2>
      <UL>
        {animais.map((animal) => (
          //<li key={animal.id}>{animal.nome}</li>// Exibe o nome de cada animal em uma lista
          <DIV key={animal.id}>
            <img src={animal.foto} width={200} height={200}></img>
            <div>
              <H2>{animal.nome}</H2>
              <P>{animal.descricao}</P>
              <A onClick={handleOpen}>
                <Link>Ver mais</Link>
              </A>
            </div>
          </DIV>
        ))}
      </UL>
      {animais.map((animal) => (
      <Modal
        key={animal.id}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {animal.nome}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            sexo:{animal.sexo}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            idade:{animal.idade}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            especie:{animal.especie}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            descricao:{animal.descricao}
          </Typography>
        </Box>
      </Modal>
      ))}
    </div>
  );
};
export default MainPage;
