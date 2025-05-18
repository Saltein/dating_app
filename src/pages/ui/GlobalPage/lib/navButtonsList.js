import { ReactComponent as UserIcon } from '../../../../shared/assets/icons/user.svg'
import { ReactComponent as ProfileIcon } from '../../../../shared/assets/icons/profile.svg'
import { ReactComponent as LikeIcon } from '../../../../shared/assets/icons/heart.svg'
import { ReactComponent as ChatIcon } from '../../../../shared/assets/icons/message.svg'
import { ReactComponent as SettingsIcon } from '../../../../shared/assets/icons/settings.svg'

export const buttonsList = [
    {
        title: 'Профиль',
        Icon: UserIcon,
        href: '/profile',
    },
    {
        title: 'Анкеты',
        Icon: ProfileIcon,
        href: '/dating',
    },
    {
        title: 'Лайки',
        Icon: LikeIcon,
        href: '/likes',
    },
    {
        title: 'Чаты',
        Icon: ChatIcon,
        href: '/chats',
    },
    {
        title: 'Настройки',
        Icon: SettingsIcon,
        href: '/settings',
    },
]