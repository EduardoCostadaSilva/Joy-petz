import styled from "styled-components";

export const Nav = styled.nav`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: pink;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; // Certifique-se de que os itens estejam alinhados à esquerda por padrão
  }
`;

export const NavItems = styled.div`
  background-color: pink;
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: column;
    gap: 10px;
  }
  font-size: 20px;
 
  /* Remover decoração de texto */
  a {
    text-decoration: none;
     color: #f34f8b;
     padding:2px;
  }
`;

export const ToggleButton = styled.button`
  background-color: #625b5b;
  display: none;
  @media (max-width: 768px) {
    display: block;
    align-self: flex-end; // Alinha o botão à direita
  }
`;
