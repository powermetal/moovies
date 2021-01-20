import db from '../apis/firebase';
import _ from 'lodash';

export const isInWatchlist = (movies, id) => {
    const movie = movies.find(m => m.id === id)
    return movie && movie.watchlist
}

export const isInFavorites = (movies, id) => {
    const movie = movies.find(m => m.id === id)
    return movie && movie.favorite
}

export const isInWatched = (movies, id) => {
    const movie = movies.find(m => m.id === id)
    return movie && movie.watched
}

export const getUpdatedMovies = (movies, newMovie, properties) => {
    const movie = movies.find(m => m.id === newMovie.id)
    if (movie)
        return _.merge({}, movie, properties)
    else
        return _.merge(newMovie, { watchlist: false, favorite: false, watched: false }, properties)
}


export const removeFromFirestore = (movie, userId, properties) => {
    if (shouldRemoveFromMovies(movie.id)) {
        db.collection('users').doc(`${userId.googleId}`).collection(`${'movies'}`).doc(`${movie.id}`).delete()
    }
    else {
        db.collection('users').doc(`${userId.googleId}`).collection(`${'movies'}`).doc(`${movie.id}`).update(properties)
    }
}

const shouldRemoveFromMovies = (movie) => {
    return !movie.watchlist && !movie.watched && !movie.favorite
}

export const addToFirestore = (movie, userId) => {
    db.collection('users').doc(`${userId.googleId}`).collection(`${'movies'}`).doc(`${movie.id}`).set(movie)
}
