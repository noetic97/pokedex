import React from 'react';
import Banner from '../../images/banner_pokemon.jpg';

function Header() {
  return (
    <header className="header">
      <img src={Banner} alt="pokemen header banner" className="header-banner" />
    </header>
  );
}

export default Header;