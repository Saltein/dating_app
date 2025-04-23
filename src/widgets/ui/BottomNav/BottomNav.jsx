import { NavButton } from '../../../shared'
import s from './BottomNav.module.scss'
import { ReactComponent as UserIcon } from '../../../shared/assets/icons/user.svg'
import { ReactComponent as ProfileIcon } from '../../../shared/assets/icons/profile.svg'
import { ReactComponent as LikeIcon } from '../../../shared/assets/icons/heart.svg'
import { ReactComponent as ChatIcon } from '../../../shared/assets/icons/message.svg'
import { ReactComponent as SettingsIcon } from '../../../shared/assets/icons/settings.svg'
import { useState } from 'react'
import { DefaultDividerV } from '../../../shared/ui'

export const BottomNav = () => {
    const [currentPage, setCurrentPage] = useState('/')

    const handleSelectPage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <NavButton
                    Icon={UserIcon}
                    href={'/profile'} onClick={handleSelectPage}
                    currentPage={currentPage}
                />
                <DefaultDividerV margin={'16px'} />
                <NavButton
                    Icon={ProfileIcon}
                    href={'/dating'} onClick={handleSelectPage}
                    currentPage={currentPage}
                />
                <DefaultDividerV margin={'16px'} />
                <NavButton
                    Icon={LikeIcon}
                    href={'/likes'} onClick={handleSelectPage}
                    currentPage={currentPage}
                />
                <DefaultDividerV margin={'16px'} />
                <NavButton
                    Icon={ChatIcon}
                    href={'/chats'} onClick={handleSelectPage}
                    currentPage={currentPage}
                />
                <DefaultDividerV margin={'16px'} />
                <NavButton
                    Icon={SettingsIcon}
                    href={'/settings'} onClick={handleSelectPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}