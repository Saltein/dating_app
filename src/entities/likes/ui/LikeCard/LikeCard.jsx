import { LikeButton } from '../../../../shared'
import s from './LikeCard.module.scss'

export const LikeCard = ({ profileData }) => {
    return (
        <div className={s.wrapper}>
            <img className={s.image} src={profileData?.img} />
            <div className={s.name_buttons}>
                <span className={s.name}>{profileData?.name}, {profileData?.age}</span>
                <div className={s.buttons}>
                    <LikeButton type='dislike' isBig={false} />
                    <LikeButton type='like' isBig={false} />
                </div>
            </div>
        </div>
    )
}