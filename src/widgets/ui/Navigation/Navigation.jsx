import { DefaultDividerH, NavButton } from '../../../shared'
import s from './Navigation.module.scss'
import { ReactComponent as UserIcon } from '../../../shared/assets/icons/user.svg'
import { ReactComponent as ProfileIcon } from '../../../shared/assets/icons/profile.svg'
import { ReactComponent as LikeIcon } from '../../../shared/assets/icons/heart.svg'
import { ReactComponent as ChatIcon } from '../../../shared/assets/icons/message.svg'
import { ReactComponent as SettingsIcon } from '../../../shared/assets/icons/settings.svg'
import { useState } from 'react'

export const Navigation = () => {
    const [currentPage, setCurrentPage] = useState('/')

    const handleSelectPage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={s.wrapper}>
            <NavButton
                title={'Профиль'} Icon={UserIcon}
                href={'/profile'} onClick={handleSelectPage}
                currentPage={currentPage}
            />
            <DefaultDividerH margin={'24px'} />
            <NavButton
                title={'Анкеты'} Icon={ProfileIcon}
                href={'/dating'} onClick={handleSelectPage}
                currentPage={currentPage}
            />
            <DefaultDividerH margin={'24px'} />
            <NavButton
                title={'Лайки'} Icon={LikeIcon}
                href={'/likes'} onClick={handleSelectPage}
                currentPage={currentPage}
            />
            <DefaultDividerH margin={'24px'} />
            <NavButton
                title={'Чаты'} Icon={ChatIcon}
                href={'/chats'} onClick={handleSelectPage}
                currentPage={currentPage}
            />
            <DefaultDividerH margin={'24px'} />
            <NavButton
                title={'Настройки'} Icon={SettingsIcon}
                href={'/settings'} onClick={handleSelectPage}
                currentPage={currentPage}
            />
        </div>
    )
}