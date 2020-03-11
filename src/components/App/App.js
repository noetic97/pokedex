import React, { Suspense, lazy } from 'react';
import { Router } from "@reach/router";
// import PokeList from "../PokeList/PokeList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SinglePokemon from "../SinglePokemon/SinglePokemon";
const PokeList = lazy(() => import("../PokeList/PokeList"));

function App() {
  return (
    <div className="app">
    <Header />
    <Suspense fallback={<h2 className="fallback-loader">Still Loading…</h2>}>
      <Router>
        <PokeList path="/" />
        <SinglePokemon path="pokemon/:id" />
      </Router>
    </Suspense>
    <Footer />
    </div>
  );
}

export default App;
