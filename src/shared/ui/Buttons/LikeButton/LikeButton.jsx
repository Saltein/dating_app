import s from './LikeButton.module.scss'
import { ReactComponent as LikeIcon } from '../../../assets/icons/heart.svg'
import { ReactComponent as SuperLikeIcon } from '../../../assets/icons/fire.svg'
import { ReactComponent as DislikeIcon } from '../../../assets/icons/cancel.svg'
import { useEffect, useState } from 'react'

// type = 'like' | 'dislike' | 'super'
export const LikeButton = ({ type = 'like', isBig = true, onClick }) => {

    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        onClick()
        setIsClicked(true)
        setTimeout(() => {
            setIsClicked(false)
        }, 600)
    }

    useEffect(()=>{
        console.log('isClicked', isClicked)
    }, [isClicked])

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
        <button className={`${s.wrapper} ${type === 'like' ? s.like : ''} ${type === 'dislike' ? s.dislike : ''} ${isClicked ? s.clicked : ''}`} onClick={handleClick}>
            {
                <Icon className={`${s.icon} ${isBig ? s.big : s.small}`} />
            }
        </button>
    )
}