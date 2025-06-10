import { LikeButton, StatBadge } from '../../../../shared'
import s from './ProfileCard.module.scss'
import { ReactComponent as LikeIcon } from '../../../../shared/assets/icons/heart.svg'
import { PhotoList } from './PhotoList/PhotoList'
import { datingApi } from '../../../../shared/api/datingApi'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../ProfileSummary/model/summarySelectors'
import { incrementProfilesQueuePos } from '../../../../features/dating/model/profilesSlice'

export const ProfileCard = ({ isProfilePage = false, data, onAction }) => {
    const dispatch = useDispatch()

    const userId = useSelector(getId)

    let photo
    let views
    let likes

    if (data) {
        photo = data.photo
        views = data.views || 0
        likes = data.likes || 0
    }

    const handleLike = async () => {
        try {
            const response = await datingApi.likeProfile(userId, data.id)
            if (!response) {
                console.log('Неизвестная ошибка лайка анкеты')
                return
            }
            if (onAction) onAction()
            dispatch(incrementProfilesQueuePos())
        } catch (error) {
            console.error('Ошибка лайка анкеты:', error)
        }
    }

    const handleSuperLike = async () => {
        try {
            const response = await datingApi.superlikeProfile(userId, data.id)
            if (!response) {
                console.log('Неизвестная ошибка супер лайка анкеты')
                return
            }
            dispatch(incrementProfilesQueuePos())
        } catch (error) {
            console.error('Ошибка супер лайка анкеты:', error)
        }
    }

    const handleDislike = async () => {
        try {
            const response = await datingApi.skipProfile(userId, data.id)
            if (!response) {
                console.log('Неизвестная ошибка пропуска анкеты')
                return
            }
            if (onAction) onAction()
            dispatch(incrementProfilesQueuePos())
        } catch (error) {
            console.error('Ошибка пропуска анкеты:', error)
        }
    }

    const handleReject = async () => {
        try {
            const response = await datingApi.rejectProfile(userId, data.id)
            if (!response) {
                console.log('Неизвестная ошибка скрытия анкеты')
                return
            }
            onAction()
        } catch (error) {
            console.error('Ошибка скрытия анкеты:', error)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.photos}>
                {data ? <PhotoList photos={photo} /> : "Данные отсутствуют"}
            </div>
            {
                isProfilePage
                    ?
                    <div className={s.params}>
                        <StatBadge title={'Просмотры'} value={views} type={'views'} />
                        <StatBadge title={'Лайки'} value={likes} Icon={LikeIcon} type={'likes'} />
                    </div>
                    :
                    <div className={s.params}>
                        <LikeButton type='dislike' onClick={onAction ? handleReject : handleDislike} />
                        {!onAction && <LikeButton type='super' onClick={handleSuperLike} />}
                        <LikeButton type='like' onClick={handleLike} />
                    </div>
            }

        </div>
    )
}