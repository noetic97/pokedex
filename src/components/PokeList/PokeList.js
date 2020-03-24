import React, { Component } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
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
      filteredTypePokemon: [],
      filteredWeaknessPokemon: [],
      filteredAllPokemon: [],
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTypeOptionSelect = this.handleTypeOptionSelect.bind(this);
    this.handleWeaknessOptionSelect = this.handleWeaknessOptionSelect.bind(this);
    this.filterAllTerms = this.filterAllTerms.bind(this);
  }
  
  componentDidMount () {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(results => results.json())
      .then(data => {
        const pokemon = data.pokemon;
        this.setState({ pokemon });
      }).catch((error) => {
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
  
  filterAllTerms () {
    const { searchTerm, typeFilterTerms, weaknessFilterTerms, pokemon } = this.state;
    
    return pokemon.filter((creature) => {
      const hasMatchingTypes = typeFilterTerms.every(typeFilterTerm => creature.type.includes(typeFilterTerm));
      const hasMatchingWeaknesses = weaknessFilterTerms.every(weaknessFilterTerm => creature.weaknesses.includes(weaknessFilterTerm));
      return creature.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 && hasMatchingTypes && hasMatchingWeaknesses;
    })
  }
  
  render() {
    const { pokemon, searchTerm } = this.state;
    
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
    
    const filteredAllPokemonList = this.filterAllTerms().map((creature) => {
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
          <PokemonCard state={{ creature, pokemon, weaknesses, types }} key={creature.num + 1000} />
        )
      })

    
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
            <ReactMultiSelectCheckboxes
              options={typeOptions}
              placeholderButtonLabel="Select Pokemon Type"
              onChange={this.handleTypeOptionSelect}
            />
          </section>
          <section className="weakness-filter-container">
            <p>Pokemon Weaknesses: </p>
            <ReactMultiSelectCheckboxes
              options={weaknessOptions}
              placeholderButtonLabel="Select Pokemon Weakness"
              onChange={this.handleWeaknessOptionSelect}
            />
          </section>
        </section>
        <section className="pokemon-list-container">
          {filteredAllPokemonList}
          
        </section>
      </main>
    );
  }
}

export default PokeList;
