import React from 'react';
import { Link } from "@reach/router";
import Banner from '../../images/banner_pokemon.jpg';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={Banner} alt="pokemen header banner" className="header-banner" />
      </Link>
    </header>
  );
}

export default Header;