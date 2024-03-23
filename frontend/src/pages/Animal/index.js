import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";


const Animal = () => {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [especie, setEspecie] = useState("");
  const [foto, setFoto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
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
        setFoto(data.foto);
        setDescricao(data.descricao);
      } catch (err) {
        setError("Houve um problema ao carregar os dados do usuario: " + err);
      }
    }
    getData();
  }, [id]);
  const handleAnimal = async (e) => {
    e.preventDefault();
    if (!nome || !sexo || !idade || !especie || !foto || !descricao) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        if (!id) {
          await api.post("/animais", {
            nome,
            sexo,
            idade,
            especie,
            foto,
            descricao,
          });
        } else {
          await api.put(`/animais/${id}`, {
            nome,
            sexo,
            idade,
            especie,
            foto,
            descricao,
          });
        }
        navigate(-1);
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao cadastra produto.");
      }
    }
  };
  const handleCancel = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleFotoChange = (e) => {
    // Verifica se algum arquivo foi selecionado
    if (e.target.files && e.target.files[0]) {
      // Cria uma URL temporária para a imagem selecionada
      setFoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Container>
      <Form onSubmit={handleAnimal}>
  {error && <p>{error}</p>}
  <input
        type="file"
        onChange={handleFotoChange}
      />
      {foto && (
        <div>
          <h2>Imagem selecionada:</h2>
          <img src={foto} alt="Imagem selecionada" style={{ maxWidth: "100%" }} />
        </div>
      )}
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
  
  <button type="submit">Salvar</button>
  <button type="button" onClick={handleCancel}>
    Cancelar
  </button>
</Form>

      </Container>
    </>
  );
};
export default Animal;
