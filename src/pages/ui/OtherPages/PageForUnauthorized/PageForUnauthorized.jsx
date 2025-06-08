import { Message } from '../../../../shared'
import { useTheme } from '../../../../shared/context/theme/ThemeContext'
import s from './PageForUnauthorized.module.scss'
import { HeroBlock } from './ui/HeroBlock/HeroBlock'
import iconProfile from '../../../../shared/assets/logos/logo.bmp'
import { useNavigate } from 'react-router-dom'

const messages = [
    {
        id: 5234,
        user_id: -20,
        text: 'Что за приложение такое? Это вообще работает?',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 5223,
        user_id: -10,
        text: 'О, ещё как! Это РайтСвайп — место, где случайные лайки превращаются в настоящие встречи, а "Привет!" может стать началом чего‑то особенного.',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 2734,
        user_id: -20,
        text: 'Но мне лень заполнять 100500 полей.',
        created_at: '2025-04-27 15:36:51.913506+03',
    },
    {
        id: 5834,
        user_id: -10,
        text: 'Спокойно! Мы не допрос. Пара кликов — и ты уже в деле. Хочешь — расскажи о себе больше, хочешь — оставь немного загадки. Мы уважаем твой стиль.',
        created_at: '2025-04-27 15:36:51.913506+03',
    },
    {
        id: 2734,
        user_id: -20,
        text: 'А как вы вообще кого-то подбираете?',
        created_at: '2025-04-27 15:37:51.913506+03',
    },
    {
        id: 5223,
        user_id: -10,
        text: 'Магия... ну или почти. Мы учитываем твои интересы, цели, местоположение и предпочтения. Алгоритм старается, чтобы ты не просто смотрел на фото, а находил максимально интересных людей.',
        created_at: '2025-04-27 15:38:51.913506+03',
    },
    {
        id: 2734,
        user_id: -20,
        text: 'Звучит круто! Пожалуй зарегистрируюсь!',
        created_at: '2025-04-27 15:38:51.913506+03',
    },
]

export const PageForUnauthorized = () => {
    const navigate = useNavigate()
    const theme = useTheme().theme
    return (
        <div className={s.wrapper} style={{
            background: `${theme === "dark"
                ? 'linear-gradient(to right, transparent, #A30B3788, #A30B3799, #A30B3788, transparent)'
                : 'linear-gradient(to right, transparent, #facc1588, #facc1599, #facc1588, transparent)'}`
        }}>
            <div className={s.blur} style={{
                backdropFilter: `blur(20px) ${theme === 'dark' ? "#121212aa" : ""}`,
                backgroundColor: `${theme === 'light' ? '#ffffffaa' : ''}`
            }}>
                <HeroBlock />
                <div className={s.dialog} onClick={() => { navigate('/auth') }}>
                    {messages.map((message, index) => {
                        return (
                            <div className={s.messageDiv} key={index} style={{justifyContent: message.user_id === -20 ? 'end' : 'start'}}>
                                {
                                    message.user_id === -10
                                        ?
                                        <div className={s.message}>
                                            <div className={s.avatar}>
                                                <img className={s.logo} alt='logo' src={iconProfile} />
                                            </div>
                                            <Message
                                                key={`${message.id} - ${index}`}
                                                messageData={message}
                                            />
                                        </div>
                                        :
                                        <Message
                                            key={`${message.id} - ${index}`}
                                            messageData={message}
                                        />
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}