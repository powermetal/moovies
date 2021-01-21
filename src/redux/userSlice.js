import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const defaultState = {
    googleId: '',
    name: '',
    avatar: '',
    movies: []
}

const addMovie = (movies, movie) => {
    if (movies.find(m => m.id === movie.id)) {
        return movies.reduce((acc, e) => {
            if (e.id === movie.id)
                acc.push(_.merge({}, e, movie))
            else
                acc.push(e)
            return acc
        }, [])
    }
    else
        return [...movies, movie]
}

const removeMovie = (movies, newMovie) => {
    return movies.reduce((acc, e) => {
        if (e.id !== newMovie.id) {
            acc.push(e)
        }
        else {
            if (newMovie.watchlist || newMovie.favorite || newMovie.watched)
                acc.push(newMovie)
        }
        return acc
    }, [])
}

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        login: (state, action) => {
            return ({ ...state, ...action.payload })
        },
        logout: () => {
            return { ...defaultState }
        },
        fetchMovies: (state, action) => {
            return { ...state, movies: action.payload }
        },
        addToMovies: (state, action) => {
            return { ...state, movies: addMovie(state.movies, action.payload) }
        },
        removeFromMovies: (state, action) => {
            return { ...state, movies: removeMovie(state.movies, action.payload) }
        }
    }
});

export const {
    login,
    logout,
    addToMovies,
    removeFromMovies,
    fetchMovies,
} = userSlice.actions;

export const isSignIn = state => state.user.googleId ? true : false

export const selectMovies = state => state.user.movies

export const selectWatchlist = state => state.user.movies.filter(m => m.watchlist)

export const selectFavorite = state => state.user.movies.filter(m => m.favorite)

export const selectWatched = state => state.user.movies.filter(m => m.watched)

export const selectUser = state => state.user

export default userSlice.reducer

