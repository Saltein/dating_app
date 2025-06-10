// selectors/summarySelectors.js

export const getId = (state) => state.summary.id
export const getName = (state) => state.summary.name
export const getAge = (state) => state.summary.age
export const getDescription = (state) => state.summary.description
export const getUserGender = (state) => state.summary.gender

// Новые единичные «качества»
export const getMaritalStatus = (state) => state.summary.marital_status
export const getSmokingAttitude = (state) => state.summary.smoking_attitude
export const getAlcoholAttitude = (state) => state.summary.alcohol_attitude
export const getPhysicalActivity = (state) => state.summary.physical_activity
export const getChildrenAttitude = (state) => state.summary.children_attitude
export const getHeight = (state) => state.summary.height_cm

// Массивные поля
export const getInterests = (state) => state.summary.interests
export const getMusic = (state) => state.summary.music
export const getGames = (state) => state.summary.games
export const getFilms = (state) => state.summary.films
export const getBooks = (state) => state.summary.books
export const getPhotos = (state) => state.summary.photos

export const getLikes = (state) => state.summary.likes
export const getViews = (state) => state.summary.views
