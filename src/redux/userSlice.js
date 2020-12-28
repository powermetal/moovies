import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    googleId: '',
    name: '',
    avatar: '',
    watchlist: []
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
        addToWatchlist: (state, action) => {
            return { ...state, watchlist: [...state.watchlist, action.payload] }
        },
        removeFromWatchlist: (state, action) => {
            return { ...state, watchlist: state.watchlist.filter(m => m.id !== action.payload.id) }
        }
    }
});

export const { login, logout, addToWatchlist, removeFromWatchlist } = userSlice.actions;

export const isSignIn = state => state.user.googleId ? true : false

export const selectWatchlist = state => state.user.watchlist

export const selectUser = state => state.user

export default userSlice.reducer

