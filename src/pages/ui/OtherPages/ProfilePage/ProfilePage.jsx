import { useEffect, useState } from 'react'
import { ProfileCard, ProfileSummary } from '../../../../entities'
import s from './ProfilePage.module.scss'
import { profileApi } from '../../../../shared/api/profileApi'

export const ProfilePage = () => {

    const [profileData, setProfileData] = useState()

    const getProfile = async () => {
        try {
            let response = await profileApi.getProfile();
            if (response) {
                setProfileData(response)
                console.log("Данные получены", response)
            } else {
                console.log("Неизвестная ошибка получения профиля")
            }
        } catch (error) {
            console.log("Ошибка получения профиля", error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className={s.wrapper}>
            <ProfileCard isProfilePage data={profileData} />
            <div className={s.profileSummary}>
                <ProfileSummary isProfilePage dataObj={profileData} />
            </div>
        </div>
    )
}