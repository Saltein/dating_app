import s from './ChatItem.module.scss'
import { useTheme } from '../../../../shared/context/theme/ThemeContext';
import profileImg from '../../../../shared/assets/icons/pngs/profile.png'

export const ChatItem = ({ chatData = {}, currentChat, onClick = () => { } }) => {
    const { theme } = useTheme()

    return (
        <div
            className={`${s.wrapper} ${currentChat === chatData.match_id ? s.current : ''} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={() => onClick(chatData.match_id)}
        >
            <div className={s.imageDiv}>
                <img className={`${s.image} ${theme === 'dark' && !chatData.user.photo?.[0] ? s.dark : s.light}`} src={chatData.user.photo?.[0] || profileImg} />
            </div>
            <div className={s.name_message}>
                <span className={s.name}>{chatData.user.name}</span>
                {/* <span className={s.message}>{chatData.lastMessage}</span> */}
            </div>
        </div>
    )
}