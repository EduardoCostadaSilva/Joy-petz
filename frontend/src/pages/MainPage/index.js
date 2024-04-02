import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { A, DIV, H2, P, UL } from "./style";
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";

const MainPage = () => {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(null); // Novo estado para o animal atual
  const [image, setImage] = useState("");


  const handleOpen = (animal) => {
    // Modifique esta função para aceitar um animal
    setCurrentAnimal(animal); // Atualiza o estado com o animal selecionado
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    async function getData() {

      const response = await api.get("/animais");
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      setAnimais(response.data);
      setImage(url);
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
          <DIV key={animal.id}>

              <img src={image} width={300} height={300} />

              <H2>{animal.nome}</H2>
              <P>{animal.descricao}</P>
              <A onClick={() => handleOpen(animal)}>
                {" "}
                {/* Altere esta linha para passar o animal atual */}
                <Link>Ver mais</Link>
              </A>
            
          </DIV>
        ))}
      </UL>
      {currentAnimal && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             <b> {currentAnimal.nome}</b>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <b> sexo:</b> {currentAnimal.sexo}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>idade:</b> {currentAnimal.idade} ano(s)
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <b> especie:</b> {currentAnimal.especie}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <b>descricao:</b>  {currentAnimal.descricao}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>contato:</b> {currentAnimal.contato}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <b> endereco: </b>{currentAnimal.endereco}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};
export default MainPage;
