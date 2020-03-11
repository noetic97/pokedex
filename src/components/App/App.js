import React from 'react';
import { Router, Link } from "@reach/router";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
    <Header />
    <Router>
      <Home path="/" />
    </Router>
    <Footer />
    </div>
  );
}

export default App;
