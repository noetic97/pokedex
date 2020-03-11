import React, { Component } from 'react';
import Pokedex from '../../helpers/pokedex';

class PokeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      sortTerm: 'default',
      searchTerm: '',
      searchResults: [],
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  
  componentDidMount () {
    const pokemon = Pokedex.pokemon;
    this.setState({ pokemon });
  }

  handleFieldChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    const {pokemon, searchTerm, searchResults, sortTerm} = this.state;
    
    if (!pokemon.length) {
      return null;
    }
    
    let pokemonList = pokemon.map((creature) => {
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
    
    return (
      <main className="home">
        <section className="search-container">
          <p>Search for your favorite Pokemon!</p>
          <input
            name='search_term'
            placeholder="Enter a name here"
            type="search"
            value={this.state.search_term}
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
