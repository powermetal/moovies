import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    googleId: '',
    name: '',
    avatar: '',
    watchlist: [],
    favorites: []
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
    fetchFavorites
} = userSlice.actions;

export const isSignIn = state => state.user.googleId ? true : false

export const selectWatchlist = state => state.user.watchlist

export const selectFavorites = state => state.user.favorites

export const selectUser = state => state.user

export default userSlice.reducer

