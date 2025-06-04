import { ProfileCard, ProfileSummary } from '../../../../entities'
import s from './DatingPage.module.scss'
import { useSelector } from 'react-redux'
import {
    getAge, getAlcoholAttitude, getBooks, getChildrenAttitude, getDescription,
    getFilms,
    getGames,
    getHeight,
    getId,
    getInterests,
    getLikes, getMaritalStatus, getMusic,
    getName,
    getPhotos,
    getPhysicalActivity,
    getSmokingAttitude, getViews
} from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'

export const DatingPage = () => {
    // ВРЕМЕННОЕ РЕШЕНИЕ
    const cardData = {
        photo: useSelector(getPhotos),
        likes: useSelector(getLikes),
        views: useSelector(getViews),
    }

    const summaryData = {
        id: useSelector(getId),
        name: useSelector(getName),
        age: useSelector(getAge),
        description: useSelector(getDescription),
        interest: useSelector(getInterests),
        music: useSelector(getMusic),
        films_books: {
            films: useSelector(getFilms),
            books: useSelector(getBooks)
        },
        games: useSelector(getGames),
        marital_status: useSelector(getMaritalStatus),
        smoking_attitude: useSelector(getSmokingAttitude),
        alcohol_attitude: useSelector(getAlcoholAttitude),
        physical_activity: useSelector(getPhysicalActivity),
        children_attitude: useSelector(getChildrenAttitude),
        height: useSelector(getHeight),
        photo: useSelector(getPhotos),
    }

    return (
        <div className={s.wrapper}>
            <ProfileCard data={cardData} />
            <div className={s.profileSummary}>
                <ProfileSummary dataObj={summaryData} />
            </div>
        </div>
    )
}