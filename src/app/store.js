import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../entities/user/model/slice'
import summaryReducer from '../entities/profile/ui/ProfileSummary/model/summarySlice'
import profilesReducer from '../features/dating/model/profilesSlice'
import chatReducer from '../entities/chat/model/chatSlice'
import authReducer from '../features/auth/model/authSlice'

const preloadedState = {
    user: {
        token: localStorage.getItem('token') || null,
    },
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        summary: summaryReducer,
        profiles: profilesReducer,
        chat: chatReducer,
        auth: authReducer,
    },
    preloadedState,
});