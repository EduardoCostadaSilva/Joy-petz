import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Nav, NavItems, ToggleButton } from "./style";
import Logo from "../../img/logo_joypetz.png"

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <Nav>
      <img src={Logo} width={100} height={100}/>
      <ToggleButton onClick={() => setShowNav(!showNav)}>
        <FaBars />
      </ToggleButton>
      <NavItems show={showNav}>
        <Link to="/home">Home</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/doar">Doar</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/sobre">Quem Somos</Link>
        <Link to="/logout">Logout</Link>
        
      </NavItems>
    </Nav>
  );
};
export default Navbar;
