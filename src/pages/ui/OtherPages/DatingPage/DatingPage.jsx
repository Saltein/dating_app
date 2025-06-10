import s from './DatingPage.module.scss'
import { ProfileCard, ProfileSummary } from '../../../../entities'
import { useDispatch, useSelector } from 'react-redux'
import { getId, getUserGender } from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'
import { datingApi } from '../../../../shared/api/datingApi'
import { useEffect, useState } from 'react'
import { getProfilesQueuePos, resetProfilesQueuePos } from '../../../../features/dating/model/profilesSlice'
import { DefaultButton } from '../../../../shared'

export const DatingPage = () => {
    const userId = useSelector(getId)
    const userGender = useSelector(getUserGender)
    const queuePos = useSelector(getProfilesQueuePos)

    const dispatch = useDispatch()

    const [profiles, setProfiles] = useState([])

    const fetchProfiles = async () => {
        try {
            const response = await datingApi.getTenProfiles(userId, userGender)
            if (!response) {
                console.log('Неизвестная ошибка получения профилей')
                return
            }
            setProfiles(response)
        } catch (error) {
            console.error('Ошибка получения профилей: ', error)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchProfiles()
        }
    }, [userId])

    const handleDeleteViews = async () => {
        try {
            const response = await datingApi.clearViews(userId)
            if (!response) {
                console.log('Неизвестная ошибка удаления просмотров')
                return
            }
            dispatch(resetProfilesQueuePos())
            fetchProfiles()
        } catch (error) {
            console.error('Ошибка удаления просмотров: ', error)
        }
    }

    const currentProfile = profiles?.[queuePos]

    if (profiles.length < 1) {
        return (
            <div className={s.wrapper}>
                <div className={s.noProfiles}>
                    <h3>Кажется, анкеты кончились</h3>
                    <DefaultButton title={'Посмотреть анкеты заново'} onClick={handleDeleteViews} />
                </div>
            </div>
        )
    } else if (!currentProfile) {
        fetchProfiles()
        dispatch(resetProfilesQueuePos())
        return <div className={s.wrapper}>Загрузка профиля...</div>
    }


    return (
        <div className={s.wrapper}>
            <ProfileCard data={{ photo: currentProfile.photo, id: currentProfile.id }} />
            <div className={s.profileSummary}>
                <ProfileSummary dataObj={currentProfile} isDating />
            </div>
        </div>
    )
}
