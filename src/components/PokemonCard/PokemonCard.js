import React from 'react';
import { Link } from "@reach/router";

function PokemonCard(props) {
  const creature = props.state.creature;
  const pokemon = props.state.pokemon;
  const types = props.state.types;
  const weaknesses = props.state.weaknesses;

  return (
    <section className="pokemon-card" key={creature.num}>
      <Link to={`pokemon/${creature.num}`} state={{ pokemon }}>
      <h4 className="pokemon-name">{`NO: ${creature.num} - ${creature.name}`}</h4>
      <section className="pokemon-card-img-container">
        <img src={creature.img} alt={`${creature.name} in action`}/>
      </section>
      <section className="poke-type-weak-container">
        <section className="type-list">
          <h5>Type:</h5>
          <ul>{types}</ul>
        </section>
        <section className="weakness-list">
          <h5>Weaknesses:</h5>
          <ul>{weaknesses}</ul>
        </section>
      </section>
      <button className="view-details-button">View Details</button>
      </Link>
    </section>
  );
}

export default PokemonCard;
