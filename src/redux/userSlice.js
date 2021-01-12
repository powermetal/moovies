import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    googleId: '',
    name: '',
    avatar: '',
    watchlist: [],
    favorites: [],
    watched: []
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
        fetchWatchlist: (state, action) => {
            return { ...state, watchlist: action.payload }
        },
        addToWatchlist: (state, action) => {
            return { ...state, watchlist: [...state.watchlist, action.payload] }
        },
        removeFromWatchlist: (state, action) => {
            return { ...state, watchlist: state.watchlist.filter(m => m.id !== action.payload.id) }
        },
        fetchWatched: (state, action) => {
            return { ...state, watched: action.payload }
        },
        addToWatched: (state, action) => {
            return { ...state, watched: [...state.watched, action.payload] }
        },
        removeFromWatched: (state, action) => {
            return { ...state, watched: state.watched.filter(m => m.id !== action.payload.id) }
        },
        fetchFavorites: (state, action) => {
            return { ...state, favorites: action.payload }
        },
        addToFavorites: (state, action) => {
            return { ...state, favorites: [...state.favorites, action.payload] }
        },
        removeFromFavorites: (state, action) => {
            return { ...state, favorites: state.favorites.filter(m => m.id !== action.payload.id) }
        }
    }
});

export const {
    login,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    fetchWatchlist,
    addToFavorites,
    removeFromFavorites,
    fetchFavorites,
    addToWatched,
    removeFromWatched,
    fetchWatched
} = userSlice.actions;

export const isSignIn = state => state.user.googleId ? true : false

export const selectWatchlist = state => state.user.watchlist

export const selectFavorites = state => state.user.favorites

export const selectWatched = state => state.user.watched

export const selectUser = state => state.user

export default userSlice.reducer

