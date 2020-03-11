import React, { Component } from 'react';
import { Link } from "@reach/router";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Pokedex from '../../helpers/pokedex';

class PokeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      sortTerm: 'default',
      searchTerm: '',
      searchedPokemon: [],
      filteredPokemon: [],
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
  }
  
  componentDidMount () {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(results => {
        return results.json();
      }).then(data => {
        const pokemon = data.pokemon;
        this.setState({ pokemon });
      }).catch((error) => {
        console.error('Error:', error);
        const pokemon = Pokedex.pokemon;
        this.setState({ pokemon });
      });
  }

  handleFieldChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, this.searchPokemon)
  }
  
  searchPokemon () {
    const {searchTerm, pokemon} = this.state;
    const searchedPokemon = pokemon.filter((creature) => {
      const creatureName = creature.name.toLowerCase();
      return creatureName.indexOf(searchTerm.toLowerCase()) !== -1
    })
    this.setState({
      searchedPokemon,
    })
  }
  
  render() {
    const {pokemon, searchTerm, searchedPokemon, sortTerm} = this.state;
    
    if (!pokemon.length) {
      return null;
    }
    
    const pokemonTypesArray = pokemon.map((creature) => {
      return [...new Set(creature.type.map(singleType => singleType))];
    });
    
    const pokemonTypes = [...new Set(pokemonTypesArray.flat(1))];
    const typeOptions = pokemonTypes.map((type) => {
      return {label: type, value: type};
    })
    
    const pokemonWeaknessArray = pokemon.map((creature) => {
      return [...new Set(creature.weaknesses.map(weakness => weakness))];
    });
    
    const pokemonWeaknesses = [...new Set(pokemonWeaknessArray.flat(1))];
    const weaknessOptions = pokemonWeaknesses.map((weakness) => {
      return {label: weakness, value: weakness};
    })
    
    const pokemonList = !searchTerm.length ? pokemon.map((creature) => {
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
      )}) : searchedPokemon.map((creature) => {
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
      console.log(searchedPokemon)
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
        <section className="filter-container">
          <section className="type-filter-container">
            <p>Pokemon Types: </p>
            <ReactMultiSelectCheckboxes options={typeOptions} placeholderButtonLabel="Select Pokemon Type" />
          </section>
          <section className="weakness-filter-container">
            <p>Pokemon Weaknesses: </p>
            <ReactMultiSelectCheckboxes options={weaknessOptions} placeholderButtonLabel="Select Pokemon Weakness" />
          </section>
        </section>
        <section className="pokemon-list-container">
          {pokemonList}
        </section>
      </main>
    );
  }
}

export default PokeList;
