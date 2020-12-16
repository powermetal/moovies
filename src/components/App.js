import React from 'react';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar'
import './App.css';
import MovieDetails from './MovieDetails/MovieDetails';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={SearchResults} />
        <Route path="/movie/:id" exact component={MovieDetails} />
      </BrowserRouter>
    </div>
  )
}

export default App;
