import React from 'react';
import Home from './Home';
import SearchResults from './SearchResults';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar'
import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={SearchResults} />
      </BrowserRouter>
    </div>
  )
}

export default App;
