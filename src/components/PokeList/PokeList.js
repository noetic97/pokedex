import React, { Component } from 'react';
import { Link } from "@reach/router";
import Pokedex from '../../helpers/pokedex';

class PokeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      sortTerm: 'default',
      searchTerm: '',
      filteredPokemon: [],
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
  }
  
  componentDidMount () {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(results => {
        return results.json();
      }).then(data => {
        let pokemon = data.pokemon;
        this.setState({ pokemon });
      }).catch((error) => {
        console.error('Error:', error);
        let pokemon = Pokedex.pokemon;
        this.setState({ pokemon });
      });
  }

  handleFieldChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, this.filterPokemon)
  }
  
  filterPokemon () {
    const {searchTerm, pokemon} = this.state;
    let searchedPokemon = pokemon.filter((creature) => {
      let creatureName = creature.name.toLowerCase();
      return creatureName.indexOf(searchTerm.toLowerCase()) !== -1
    })
    this.setState({
      filteredPokemon: searchedPokemon,
    })
  }
  
  render() {
    const {pokemon, searchTerm, filteredPokemon, sortTerm} = this.state;
    
    if (!pokemon.length) {
      return null;
    }
    
    let pokemonList = !searchTerm.length ? pokemon.map((creature) => {
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
      return(
        <section className="pokemon-card" key={creature.num}>
          <Link to={`pokemon/${creature.num}`} pokemon={creature} state={{ pokemon: creature}}>
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
        </Link>
        </section>
      )}) : filteredPokemon.map((creature) => {
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
      return(
        <section className="pokemon-card" key={creature.num}>
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
        </section>
      )
    })
    
    if (searchTerm.length) {
      console.log(filteredPokemon)
    }
    
    return (
      <main className="home">
        <section className="search-container">
          <p>Search for your favorite Pokemon!</p>
          <input
            name='searchTerm'
            placeholder="Enter a name here"
            type="search"
            value={searchTerm}
            onChange={this.handleFieldChange}
          />
        </section>
        <section className="pokemon-list-container">
          {pokemonList}
        </section>
      </main>
    );
  }
}

export default PokeList;
