import s from './ProfilePage.module.scss'
import { ProfileCard, ProfileSummary } from '../../../../entities'
import { useDispatch, useSelector } from 'react-redux'
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
import { useEffect } from 'react'
import { profileApi } from '../../../../shared/api/profileApi'
import { setAll } from '../../../../entities/profile/ui/ProfileSummary/model/summarySlice'

export const ProfilePage = () => {
    const dispatch = useDispatch()

    const cardData = {
        photo: useSelector(getPhotos),
        likes: useSelector(getLikes),
        views: useSelector(getViews),
    }
    console.log('cardData', cardData)

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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileApi.getProfile();
                if (response) {
                    dispatch(setAll(response));
                }
            } catch (error) {
                console.error("Ошибка загрузки профиля", error);
            }
        };
        fetchProfile();
    }, [dispatch]);

    return (
        <div className={s.wrapper}>
            <ProfileCard isProfilePage data={cardData} />
            <div className={s.profileSummary}>
                <ProfileSummary isProfilePage dataObj={summaryData} />
            </div>
        </div>
    )
}