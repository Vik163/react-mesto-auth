import headerLogo from "./../images/Vector.svg";

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
    </header>
  );
}

export default Header;
