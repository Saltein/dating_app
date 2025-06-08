import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentMatchChat: -1,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentMatchChat: (state, action) => {
            state.currentMatchChat = action.payload;
        },
    },
});

export const { setCurrentMatchChat } = chatSlice.actions;
export default chatSlice.reducer;
export const getCurrentMatchChat = (state) => state.chat.currentMatchChat;