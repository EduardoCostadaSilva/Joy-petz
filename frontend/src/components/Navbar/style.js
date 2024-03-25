import styled from "styled-components";
export const Nav = styled.nav`
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
    list-style: none;
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
