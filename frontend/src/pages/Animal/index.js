import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Animal = () => {

  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [especie, setEspecie] = useState("");
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        const { data } = await api.get(`/animais/${id}`);
        setNome(data.nome);
        setSexo(data.sexo);
        setIdade(data.idade);
        setEspecie(data.especie);
        setDescricao(data.descricao);
        setImage(data.foto);
      } catch (err) {
        setError("Houve um problema ao carregar os dados do usuario: " + err);
      }
    }
    getData();
  }, [id]);


  const handleAnimal = async (e) => {
    e.preventDefault();
    console.log(image)
    if (!nome || !sexo || !idade || !especie || !descricao) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        if (!id) {
          await api.post("/animais", {
            nome,
            sexo,
            idade,
            especie,
            //foto,
            descricao,
          });
        } else {
          await api.put(`/animais/${id}`, {
            nome,
            sexo,
            idade,
            especie,
            //foto,
            descricao,
          });
        }
        navigate(-1);
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao cadastrar o animal.");
      }
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navega para a página anterior
  };

const handleClick = async () => {
  try {
    const formData = new FormData();
    formData.append('image', image); // Certifique-se de usar o nome do campo correto
    const response = await axios.post("http://localhost:3077/upload-image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Certifique-se de definir o cabeçalho correto para enviar arquivos
      }
    });
    console.log('Axios response: ', response);
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
  }
}


  return (
    <>
      <Navbar />
      <Container>
        <Form>
        <input type="file" name="image" onChange={e => setImage(e.target.files[0])} />
          <button onClick={handleClick} type="submit">Enviar Imagem</button>
        </Form>
        
        <Form onSubmit={handleAnimal}>
          {error && <p>{error}</p>}
          
          
          <input
            value={nome}
            type="text"
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            value={sexo}
            type="text"
            placeholder="Sexo"
            onChange={(e) => setSexo(e.target.value)}
          />
          <input
            value={idade}
            type="number"
            placeholder="Idade"
            onChange={(e) => setIdade(e.target.value)}
          />
          <input
            value={especie}
            type="text"
            placeholder="Especie"
            onChange={(e) => setEspecie(e.target.value)}
          />
          <input
            value={descricao}
            type="text"
            placeholder="Uma breve descrição sobre o animal"
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button type="submit" >Salvar</button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </Form>
      </Container>
    </>
  );
};

export default Animal;