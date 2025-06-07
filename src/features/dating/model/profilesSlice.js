import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profilesQueuePos: 0,
};

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setProfilesQueuePos: (state, action) => {
            state.profilesQueuePos = action.payload
        },
        incrementProfilesQueuePos: (state) => {
            state.profilesQueuePos++
        },
        resetProfilesQueuePos: (state) => {
            state.profilesQueuePos = 0
        }
    },
});

export const { setProfilesQueuePos, resetProfilesQueuePos, incrementProfilesQueuePos } = profilesSlice.actions
export default profilesSlice.reducer
export const getProfilesQueuePos = (state) => state.profiles.profilesQueuePos
