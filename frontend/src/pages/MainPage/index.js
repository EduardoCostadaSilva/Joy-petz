import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { A, DIV, H2, P, UL } from "./style";

const MainPage = () => {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/animais");
        setAnimais(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleOpen = (animal) => {
    setSelectedAnimal(animal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnimal(null);
  };

  if (loading) {
    return <p>Carregando animais...</p>;
  }

  return (
    <div>
      <Navbar />
      <h2>Lista de Animais</h2>
      <UL>
        {animais.map((animal) => (
          <DIV key={animal.id}>
            {animal.foto && (
              <img
                src={animal.foto}
                alt="Foto do Animal"
                width={200}
                height={200}
              />
            )}
            <div>
              <H2>{animal.nome}</H2>
              <P>{animal.descricao}</P>
              <A onClick={() => handleOpen(animal)}>
                <Link>Ver mais</Link>
              </A>
            </div>
          </DIV>
        ))}
      </UL>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {selectedAnimal && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedAnimal.nome}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Sexo: {selectedAnimal.sexo}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Idade: {selectedAnimal.idade}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Espécie: {selectedAnimal.especie}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Descrição: {selectedAnimal.descricao}
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default MainPage;
