import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gender: {id: null, name: ''},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setGender: (state, action) => {
            state.gender = action.payload;
        },
    },
});

export const { setGender } = authSlice.actions;
export default authSlice.reducer;

export const getGender = (state) => state.auth.gender