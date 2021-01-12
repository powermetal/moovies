import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar'
import './App.css';
import MovieDetails from './MovieDetails/MovieDetails';
import db from '../apis/firebase';
import { selectUser, fetchWatchlist, fetchFavorites, fetchWatched } from '../redux/userSlice';

const App = () => {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.googleId)
      return
    db.collection(`users`).doc(`${user.googleId}`).collection('watchlist').get().then(doc => dispatch(fetchWatchlist(doc.docs.map(doc => doc.data()))))
    db.collection(`users`).doc(`${user.googleId}`).collection('favorites').get().then(doc => dispatch(fetchFavorites(doc.docs.map(doc => doc.data()))))
    db.collection(`users`).doc(`${user.googleId}`).collection('watched').get().then(doc => dispatch(fetchWatched(doc.docs.map(doc => doc.data()))))
  }, [user.googleId])

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
