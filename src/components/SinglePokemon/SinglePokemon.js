import React from 'react';
import { Link } from "@reach/router";

function SinglePokemon(props) {
    
  const creature = props.location.state.pokemon;
  
  let types = creature.type.map((singleType, i) => {
    return(
      <li key={creature.num + 1000 + i}>{singleType}</li>  
    )
  });
  let weaknesses = creature.weaknesses.map((weakness, i) => {
    return(
      <li key={creature.num + 1000 + i}>{weakness}</li>  
    )
  });
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
        </section>
      </section>
      <Link to="/">
        <button className="view-all-button">View all Pokemon!</button>
      </Link>
    </main>
  );
}

export default SinglePokemon;
