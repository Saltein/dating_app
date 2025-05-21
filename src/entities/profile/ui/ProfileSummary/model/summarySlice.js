import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    name: '',
    age: '',
    description: '',
    interest: [],
    music: [],
    films_books: { films: '', books: '' },
    games: [],
    likes: null,
    views: null,
    photo: [],
    quality: [], // Тут потом будет объект
}

const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setAge: (state, action) => {
            state.age = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setInterest: (state, action) => {
            state.interest = action.payload
        },
        setMusic: (state, action) => {
            state.music = action.payload
        },
        setFilmsBooks: (state, action) => {
            state.films_books = action.payload
        },
        setGames: (state, action) => {
            state.games = action.payload
        },
        setLikes: (state, action) => {
            state.likes = action.payload
        },
        setViews: (state, action) => {
            state.views = action.payload
        },
        setPhoto: (state, action) => {
            state.photo = action.payload
        },
        setQuality: (state, action) => {
            state.quality = action.payload
        },
        setAll: (state, action) => {
            const {
                id, name, age, description,
                interest, music, films_books,
                games, likes, views, photo, quality
            } = action.payload

            state.id = id
            state.name = name
            state.age = age
            state.description = description
            state.interest = interest
            state.music = music
            state.films_books = films_books
            state.games = games
            state.likes = likes
            state.views = views
            state.photo = photo
            state.quality = quality
        },

        removeParam: (state, action) => {
            const { key, value } = action.payload;
            state[key] = state[key].filter(item => item.id !== value);
        }
    },
})

export const {
    setId, setName,
    setAge, setDescription,
    setInterest, setMusic,
    setFilmsBooks, setGames,
    setLikes, setViews,
    setPhoto, setQuality,
    setAll, removeParam,
} = summarySlice.actions
export default summarySlice.reducer