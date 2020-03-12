import React from 'react';
import { Link } from "@reach/router";
import Pokedex from '../../helpers/pokedex';

function SinglePokemon(props) {
  const pokemon = props.location.state ? props.location.state.pokemon : Pokedex.pokemon;
  const creature = pokemon.find(obj => obj.num === props.id);
  
  const types = creature.type.map((singleType, i) => {
    return(
      <li key={creature.num + 1000 + i}>{singleType}</li>  
    )
  });
  const weaknesses = creature.weaknesses.map((weakness, i) => {
    return(
      <li key={creature.num + 1000 + i}>{weakness}</li>  
    )
  });  
  const previousEvolution = creature.prev_evolution ? creature.prev_evolution.map((evolution, i) => {
    return(
      <Link to={`/pokemon/${evolution.num}`} key={evolution.num + 1001 + i} state={{ pokemon: pokemon}}>
        <li>
          <p>Previous Evolution: {evolution.name}</p>
        </li>  
      </Link>
    )
  }) : "";
  const nextEvolution = creature.next_evolution ? creature.next_evolution.map((evolution, i) => {
    return(
      <Link to={`/pokemon/${evolution.num}`} key={evolution.num + 1001 + i} state={{ pokemon: pokemon}}>
        <li>
          <p>Next Evolution: {evolution.name}</p>
        </li>  
      </Link>
    )
  }) : "";

  return (
    <main className="single-pokemon-container">
      <section className="single-pokemon-card">
        <h4 className="pokemon-name">{`NO: ${creature.num} - ${creature.name}`}</h4>
        <section className="pokemon-card-img-container">
          <img src={creature.img} alt={`${creature.name} in action`}/>
        </section>
        <section>
          <p>HT: {creature.height} - WT: {creature.weight}</p>
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
          <section className="previous evolution-container">
            <ul>
              {previousEvolution}
            </ul>
          </section>
          <section className="next evolution-container">
            <ul>
              {nextEvolution}
            </ul>
          </section>
        </section>
      </section>
      <Link to="/">
        <button className="view-all-button">View all Pokemon!</button>
      </Link>
    </main>
  );
}

export default SinglePokemon;
