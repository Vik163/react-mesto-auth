import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "./../images/Vector.svg";

function Header(props) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__info">
        <span className="header__email">{props.email}</span>
        <Link
          className="header__link button-hover"
          onClick={props.signOut}
          to={props.link}
        >
          {props.infoLink}
        </Link>
      </div>
    </header>
  );
}

export default Header;
