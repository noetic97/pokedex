import React, { Component } from 'react';
import { Link } from "@reach/router";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Pokedex from '../../helpers/pokedex';

class PokeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      typeFilterTerms: [],
      weaknessFilterTerms: [],
      searchTerm: '',
      searchedPokemon: [],
      filteredPokemon: [],
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
    this.handleTypeOptionSelect = this.handleTypeOptionSelect.bind(this);
    this.handleWeaknessOptionSelect = this.handleWeaknessOptionSelect.bind(this);
    this.filterType = this.filterType.bind(this);
    this.filterWeakness = this.filterWeakness.bind(this);
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
  
  handleTypeOptionSelect (e) {
    const typeFilterTerms = [...new Set(e.map(typeObject => typeObject.value))];
    this.setState({ typeFilterTerms }, this.filterType);
  }
  handleWeaknessOptionSelect (e) {
    const weaknessFilterTerms = [...new Set(e.map(weaknessObject => weaknessObject.value))];
    this.setState({ weaknessFilterTerms }, this.filterWeakness);
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
  
  filterType () {
    const { pokemon, typeFilterTerms, filteredPokemon } = this.state;
    if(!typeFilterTerms.length) {
      this.filterWeakness();
    }
    let filteredTypePokemon = filteredPokemon.length && typeFilterTerms.length ? filteredPokemon.filter((creature) => creature.type.some( type => typeFilterTerms[typeFilterTerms.length - 1].includes(type)))
      .map((creature) => creature) : pokemon.filter((creature) => creature.type.some( type => typeFilterTerms.includes(type)))
        .map((creature) => creature);
        
        console.log(typeFilterTerms, "terms")
        console.log(filteredTypePokemon, "ftype")

    this.setState({ filteredPokemon: filteredTypePokemon });
  }

  filterWeakness () {
    const { pokemon, weaknessFilterTerms, filteredPokemon } = this.state;
    if(!weaknessFilterTerms.length) {
      this.filterType();
    }
    let filteredWeakPokemon = filteredPokemon.length && weaknessFilterTerms.length ? filteredPokemon.filter((creature) => creature.weaknesses.some( weaknesses => weaknessFilterTerms[weaknessFilterTerms.length - 1].includes(weaknesses)))
      .map((creature) => creature) : pokemon.filter((creature) => creature.weaknesses.some( weaknesses => weaknessFilterTerms.includes(weaknesses)))
        .map((creature) => creature);

    this.setState({ filteredPokemon: filteredWeakPokemon });
  }
  
  render() {
    const {pokemon, searchTerm, searchedPokemon, filteredPokemon, typeFilterTerms, weaknessFilterTerms} = this.state;
    
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
      )
    });
    
    const filteredPokemonList = typeFilterTerms.length || weaknessFilterTerms.length ? filteredPokemon.map((creature) => {
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
      )
    }) : pokemonList;

    
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
            <ReactMultiSelectCheckboxes options={typeOptions} placeholderButtonLabel="Select Pokemon Type" onChange={this.handleTypeOptionSelect}/>
          </section>
          <section className="weakness-filter-container">
            <p>Pokemon Weaknesses: </p>
            <ReactMultiSelectCheckboxes options={weaknessOptions} placeholderButtonLabel="Select Pokemon Weakness" onChange={this.handleWeaknessOptionSelect}/>
          </section>
        </section>
        <section className="pokemon-list-container">
          {filteredPokemonList}
        </section>
      </main>
    );
  }
}

export default PokeList;
