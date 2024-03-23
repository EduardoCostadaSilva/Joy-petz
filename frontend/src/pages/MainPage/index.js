import React, { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const response = await axios.get("/animais"); // Faz a solicitação GET para /animais
        setAnimais(response.data); // Define os animais retornados no estado
        setLoading(false); // Define loading como falso após a conclusão da solicitação
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
        setLoading(false); // Define loading como falso em caso de erro
      }
    };

    fetchAnimais(); // Chama a função de busca de animais ao montar o componente
  }, []); // O array vazio [] assegura que useEffect será chamado apenas uma vez após a montagem do componente

  if (loading) {
    return <p>Carregando animais...</p>;
  }

  return (
    <div>
      <h2>Lista de Animais</h2>
      <ul>
        {animais.map((animal) => (
          <li key={animal.id}>{animal.nome}</li> // Exibe o nome de cada animal em uma lista
        ))}
      </ul>
    </div>
  );
};
export default MainPage;
