import s from './ChatItem.module.scss'
import { useTheme } from '../../../../shared/context/theme/ThemeContext';

export const ChatItem = ({ chatData = {}, currentChat, onClick = () => { } }) => {
    const { theme } = useTheme();

    return (
        <div
            className={`${s.wrapper} ${currentChat === chatData.chatId ? s.current : ''} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={() => onClick(chatData.chatId)}
        >
            <img className={s.image} src={chatData.user.image} />
            <div className={s.name_message}>
                <span className={s.name}>{chatData.user.name}</span>
                <span className={s.message}>{chatData.lastMessage}</span>
            </div>
        </div>
    )
}