import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    return (
      <section className="filter-container">
        <input type="text"/>
      </section>
    );
  }
}

export default Filter;
