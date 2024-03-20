import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Nav, NavItems, ToggleButton } from "./style";
import Logo from "../../img/logo_joypetz.png"

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <Nav>
       <img src={Logo} alt="logo_joypetz" width={"100px"} height={"100px"}/>
      <ToggleButton onClick={() => setShowNav(!showNav)}>
        <FaBars />
      </ToggleButton>
      <NavItems show={showNav}>
        <Link to="/signup">Cadastro de Usuários</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/logout">Logout</Link>
      </NavItems>
    </Nav>
  );
};
export default Navbar;
