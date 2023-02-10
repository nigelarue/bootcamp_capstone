import React from "react";

function Footer(props) {
  return (
    <Footer className="flex-row space-between px-1">
      <h1>Lernantino</h1>

      {props.children}
    </Footer>
  );
}

export default Footer;
