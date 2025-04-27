import s from './UserDropdownMenu.module.scss'
import userIcon from './assets/user.svg'
import downIcon from './assets/down.svg'
import logoutIcon from './assets/logout.svg'
import { useState } from 'react'
import { DefaultDividerH } from '../../../shared'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../features/auth/model/authActions'

export const UserDropdownMenu = ({ name }) => {
    const [isOpen, setOpen] = useState(false)
    const dispatch = useDispatch();

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
                <img className={s.userImage} src={userIcon} alt='userImage' />
                <span className={`${s.name} ${isOpen ? s.open : ''}`}>{name}</span>
                <img className={`${s.downImage} ${isOpen ? s.open : ''}`} src={downIcon} alt='downImage' />
            </div>
            {isOpen && <DefaultDividerH margin={'16px'} />}
            {isOpen &&
                <div className={s.exit}>
                    <img className={s.logoutImage} src={logoutIcon} alt='logoutImage' />
                    <div className={s.exitButton} onClick={handleLogout}>Выйти</div>
                </div>
            }
        </div>
    )
}