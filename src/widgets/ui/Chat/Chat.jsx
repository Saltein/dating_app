import s from './Chat.module.scss'
import { Message } from '../../../shared/ui'

const messages = [
    {
        id: 5234,
        user_id: 7,
        text: 'Привет!',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 5223,
        user_id: 8,
        text: 'Привет)',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 2734,
        user_id: 7,
        text: 'Nulla consequat nostrud nisi ut aute aliqua cupidatat pariatur voluptate. Consequat sunt occaecat nulla id deserunt deserunt non. Et adipisicing mollit aute excepteur. Amet laborum sunt fugiat eu dolor. Velit mollit deserunt excepteur nisi. Velit minim voluptate sunt culpa magna est ea elit adipisicing. Occaecat consequat tempor aliqua mollit incididunt ipsum officia duis deserunt aute.',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 5834,
        user_id: 8,
        text: 'Да, я тоже так думаю',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
]

export const Chat = ({ chatId }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.messages}>
                {messages.map((message, index) => {
                    return (
                        <Message
                            key={`${message.id} - ${index}`}
                            messageData={message}
                        />
                    )
                })}
            </div>
        </div>
    )
}