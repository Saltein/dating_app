import { useState } from 'react'
import { LikeButton, ModalWindow } from '../../../../shared'
import s from './LikeCard.module.scss'
import { datingApi } from '../../../../shared/api/datingApi'
import { useSelector } from 'react-redux'
import { getId } from '../../../profile/ui/ProfileSummary/model/summarySelectors'
import { ProfileCard, ProfileSummary } from '../../../profile/ui'

export const LikeCard = ({ profileData, onAction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const userId = useSelector(getId)
    console.log('profileData', profileData)

    const handleLike = async () => {
        try {
            const response = await datingApi.likeProfile(userId, profileData.id)
            if (!response) {
                console.log('Неизвестная ошибка лайка анкеты')
                return
            }
            onAction()
            console.log(response)
        } catch (error) {
            console.error('Ошибка лайка анкеты:', error)
        }
    }

    const handleDislike = async () => {
        try {
            const response = await datingApi.rejectProfile(userId, profileData.id)
            if (!response) {
                console.log('Неизвестная ошибка скрытия анкеты')
                return
            }
            onAction()
            console.log(response)
        } catch (error) {
            console.error('Ошибка скрытия анкеты:', error)
        }
    }

    return (
        <div className={s.wrapper} onClick={() => setIsModalOpen(true)}>
            <img className={s.image} src={profileData.photo[0] || 'https://dummyimage.com/400x400/7d98b3/ffffff&text=%D0%A4%D0%BE%D1%82%D0%BE+%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F'} />
            <div className={s.name_buttons}>
                <span className={s.name}>{profileData?.name}, {profileData?.age}</span>
                <div className={s.buttons} onClick={(e) => e.stopPropagation()}>
                    <LikeButton type='dislike' isBig={false} onClick={handleDislike} />
                    <LikeButton type='like' isBig={false} onClick={handleLike} />
                </div>
            </div>

            {isModalOpen &&
                <ModalWindow onClose={() => setIsModalOpen(false)}>
                    <div className={s.window}>
                        <ProfileCard data={{ photo: profileData.photo, id: profileData.id }} onAction={() => {
                            onAction()
                            setIsModalOpen(false)
                        }} />
                        <div className={s.profileSummary}>
                            <ProfileSummary dataObj={profileData} isDating />
                        </div>
                    </div>
                </ModalWindow>}
        </div>
    )
}