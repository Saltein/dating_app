import s from './UserDropdownMenu.module.scss'
import userIcon from './assets/user.svg'
import downIcon from './assets/down.svg'
import logoutIcon from './assets/logout.svg'
import { useState } from 'react'
import { DefaultDividerH } from '../../../shared'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../features/auth/model/authActions'
import { useNavigate } from 'react-router-dom'
import { getName } from '../../../entities/profile/ui/ProfileSummary/model/summarySelectors'

export const UserDropdownMenu = () => {
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const dispatch = useDispatch()
    const name = useSelector(getName)

    const handleOpen = () => {
        setOpen(!isOpen)
    }

    const handleLogout = () => {
        setOpen(false)
        dispatch(logoutUser())
        console.log('Пользователь вышел из аккаунта')
    }

    return (
        <div className={`${s.wrapper} ${isOpen ? s.open : ''}`} onClick={handleOpen}>
            <div className={s.button}>
                <img className={s.userImage} src={userIcon} alt='userImage' onClick={() => navigate('/profile')} />
                <span className={`${s.name} ${isOpen ? s.open : ''}`}>{name}</span>
                <img className={`${s.downImage} ${isOpen ? s.open : ''}`} src={downIcon} alt='downImage' />
            </div>
            {isOpen &&
                <>
                    <DefaultDividerH margin={'16px'} />
                    <div className={s.exit} onClick={handleLogout}>
                        <img className={s.logoutImage} src={logoutIcon} alt='logoutImage' />
                        <div className={s.exitButton} >Выйти</div>
                    </div>
                </>
            }
        </div>
    )
}