import { useNavigate } from 'react-router-dom'
import s from './GoBackButton.module.scss'
import {ReactComponent as BackIcon} from './../../../assets/icons/back.svg'

export const GoBackButton = ({ title, href }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        if (href) {
            navigate(href)
        }
    }

    return (
        <div className={s.wrapper}>
            <BackIcon className={s.icon} />
            <div className={s.button} onClick={handleClick}>{title}</div>
        </div>
    )
}