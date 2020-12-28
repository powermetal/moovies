import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    googleId: '',
    name: '',
    avatar: ''
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
        }
    }
});

export const { login, logout } = userSlice.actions;

export const isSignIn = state => state.user.googleId ? true : false

export const selectUser = state => state.user

export default userSlice.reducer

