import React from "react";

import { contactScreenStyles } from "./style";
import Navbar from "../../components/Navbar";

const ContactScreen = () => {
  return (
    <>
      <Navbar />
      <div style={contactScreenStyles.body} >
        <div style={contactScreenStyles.container}>
          <h1>Contato</h1>
          <hr style={contactScreenStyles.hr} />
          <p style={contactScreenStyles.paragraph}>
            Se tiver alguma dúvida, não hesite em nos contatar!
          </p>
          <p style={contactScreenStyles.paragraph}>
            E-mail : suporte.joypetz@gmail.com
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactScreen;
