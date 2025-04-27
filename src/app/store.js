import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../entities/user/model/slice';

const preloadedState = {
    auth: {
        token: localStorage.getItem('token') || null,
    },
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});