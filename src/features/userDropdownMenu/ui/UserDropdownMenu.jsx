import s from './UserDropdownMenu.module.scss'
import userIcon from './assets/user.svg'
import downIcon from './assets/down.svg'
import logoutIcon from './assets/logout.svg'
import { useState } from 'react'
import { DefaultDividerH } from '../../../shared'

export const UserDropdownMenu = ({ name }) => {
    const [isOpen, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!isOpen)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        setOpen(false)
        console.log('logout')
    }

    return (
        <div className={`${s.wrapper} ${isOpen ? s.open : ''}`} onClick={handleOpen}>
            <div className={s.button}>
                <img className={s.userImage} src={userIcon} />
                <span className={`${s.name} ${isOpen ? s.open : ''}`}>{name}</span>
                <img className={`${s.downImage} ${isOpen ? s.open : ''}`} src={downIcon} />
            </div>
            {isOpen && <DefaultDividerH margin={'16px'} />}
            {isOpen &&
                <div className={s.exit}>
                    <img className={s.logoutImage} src={logoutIcon} />
                    <div className={s.exitButton} onClick={handleLogout}>Выйти</div>
                </div>
            }
        </div>
    )
}