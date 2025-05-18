import { ProfileCard, ProfileSummary } from '../../../../entities'
import s from './ProfilePage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAge, getDescription,
    getFilmsBooks, getGames,
    getId, getInterest,
    getLikes, getMusic,
    getName, getPhoto,
    getQuality, getViews
} from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'

export const ProfilePage = () => {
    const dispatch = useDispatch()

    const cardData = {
        photo: useSelector(getPhoto),
        likes: useSelector(getLikes),
        views: useSelector(getViews),
    }

    const summaryData = {
        id: useSelector(getId),
        name: useSelector(getName),
        age: useSelector(getAge),
        description: useSelector(getDescription),
        interest: useSelector(getInterest),
        music: useSelector(getMusic),
        films_books: useSelector(getFilmsBooks),
        games: useSelector(getGames),
        quality: useSelector(getQuality),
        photo: useSelector(getPhoto),
    }

    return (
        <div className={s.wrapper}>
            <ProfileCard isProfilePage data={cardData} />
            <div className={s.profileSummary}>
                <ProfileSummary isProfilePage dataObj={summaryData} />
            </div>
        </div>
    )
}