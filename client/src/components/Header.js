import React from "react";

function Header(props) {
  return (
    <header className="flex-row space-between px-1">
      <h1>Lernantino</h1>

      {props.children}
    </header>
  );
}

export default Header;
