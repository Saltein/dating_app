import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    name: '',
    age: null,
    description: '',

    // Новые единичные «качества»
    marital_status: null,
    smoking_attitude: null,
    alcohol_attitude: null,
    physical_activity: null,
    children_attitude: null,
    height_cm: null,

    // Массивные поля
    interests: [],    // [{id, title}, …]
    music: [],        // [{id, title}, …]
    games: [],        // [{id, title}, …]
    films: [],        // ['Inception', …]
    books: [],        // ['1984', …]
    photos: [],       // ['https://…', …]

    likes: 0,
    views: 0
}

const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        // Устанавливаем каждое поле по-отдельности (если понадобится)
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

        // Новые единственные «качества»
        setMaritalStatus: (state, action) => {
            state.marital_status = action.payload
        },
        setSmokingAttitude: (state, action) => {
            state.smoking_attitude = action.payload
        },
        setAlcoholAttitude: (state, action) => {
            state.alcohol_attitude = action.payload
        },
        setPhysicalActivity: (state, action) => {
            state.physical_activity = action.payload
        },
        setChildrenAttitude: (state, action) => {
            state.children_attitude = action.payload
        },
        setHeight: (state, action) => {
            state.height_cm = action.payload
        },

        // Массивные поля
        setInterests: (state, action) => {
            state.interests = action.payload
        },
        setMusic: (state, action) => {
            state.music = action.payload
        },
        setGames: (state, action) => {
            state.games = action.payload
        },
        setFilms: (state, action) => {
            state.films = action.payload
        },
        setBooks: (state, action) => {
            state.books = action.payload
        },
        setPhotos: (state, action) => {
            state.photos = action.payload
        },

        setLikes: (state, action) => {
            state.likes = action.payload
        },
        setViews: (state, action) => {
            state.views = action.payload
        },

        // Самая удобная: подставляем сразу весь ответ от сервера
        setAll: (state, action) => {
            const {
                id,
                name,
                age,
                description,
                marital_status,
                smoking_attitude,
                alcohol_attitude,
                physical_activity,
                children_attitude,
                height_cm,
                interests,
                music,
                games,
                films,
                books,
                photos,
                likes,
                views
            } = action.payload

            state.id = id
            state.name = name
            state.age = age
            state.description = description

            state.marital_status = marital_status
            state.smoking_attitude = smoking_attitude
            state.alcohol_attitude = alcohol_attitude
            state.physical_activity = physical_activity
            state.children_attitude = children_attitude
            state.height_cm = height_cm

            state.interests = Array.isArray(interests) ? interests : []
            state.music = Array.isArray(music) ? music : []
            state.games = Array.isArray(games) ? games : []
            state.films = Array.isArray(films) ? films : []
            state.books = Array.isArray(books) ? books : []
            state.photos = Array.isArray(photos) ? photos : []

            state.likes = likes ?? 0
            state.views = views ?? 0
        },

        // Удаляем из какого-либо массива элемент по id (если понадобится)
        removeFromArray: (state, action) => {
            const { key, value } = action.payload
            if (!Array.isArray(state[key])) return
            state[key] = state[key].filter(item => {
                // Если это объект с полем id
                if (item && typeof item === 'object' && 'id' in item) {
                    return item.id !== value
                }
                // Иначе — просто сравниваем само значение
                return item !== value
            })
        }
    },
})

export const {
    setId,
    setName,
    setAge,
    setDescription,
    setMaritalStatus,
    setSmokingAttitude,
    setAlcoholAttitude,
    setPhysicalActivity,
    setChildrenAttitude,
    setHeight,
    setInterests,
    setMusic,
    setGames,
    setFilms,
    setBooks,
    setPhotos,
    setLikes,
    setViews,
    setAll,
    removeFromArray
} = summarySlice.actions
export default summarySlice.reducer
