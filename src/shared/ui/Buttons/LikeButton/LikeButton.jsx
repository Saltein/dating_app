import s from './LikeButton.module.scss'
import { ReactComponent as LikeIcon } from '../../../assets/icons/heart.svg'
import { ReactComponent as SuperLikeIcon } from '../../../assets/icons/fire.svg'
import { ReactComponent as DislikeIcon } from '../../../assets/icons/cancel.svg'

// type = 'like' | 'dislike' | 'super'
export const LikeButton = ({ type = 'like', isBig = true }) => {
    let Icon

    if (type === 'like') {
        Icon = LikeIcon
    }
    else if (type === 'super') {
        Icon = SuperLikeIcon
    }
    else {
        Icon = DislikeIcon
    }

    return (
        <button className={`${s.wrapper} ${type === 'like' ? s.like : ''} ${type === 'dislike' ? s.dislike : ''}`}>
            {
                <Icon className={`${s.icon} ${isBig ? s.big : s.small}`} />
            }
        </button>
    )
}