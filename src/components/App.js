import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar'
import './App.css';
import MovieDetails from './MovieDetails/MovieDetails';
import Profile from './Profile/Profile';
import db from '../apis/firebase';
import { selectUser, fetchMovies } from '../redux/userSlice';

const App = () => {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.googleId)
      return
    db.collection(`users`).doc(`${user.googleId}`).collection('movies').get().then(doc => dispatch(fetchMovies(doc.docs.map(doc => doc.data()))))
  }, [user.googleId])

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={SearchResults} />
        <Route path="/movie/:id" exact component={MovieDetails} />
        <Route path="/profile" exact component={Profile} />
      </BrowserRouter>
    </div>
  )
}

export default App;
