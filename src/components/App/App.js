import React, { Suspense, lazy } from 'react';
import { Router, Link } from "@reach/router";
// import PokeList from "../PokeList/PokeList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const PokeList = lazy(() => import("../PokeList/PokeList"));

function App() {
  return (
    <div className="app">
    <Header />
    <Suspense fallback={<h1>Still Loading…</h1>}>
      <Router>
          <PokeList path="/" />
      </Router>
    </Suspense>
    <Footer />
    </div>
  );
}

export default App;
