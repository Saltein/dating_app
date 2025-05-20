import s from './Chat.module.scss'
import { Message } from '../../../shared/ui'

const messages = [
    {
        id: 5234,
        user_id: 8,
        text: 'aboba1',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 5223,
        user_id: 8,
        text: 'aboba2',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 2734,
        user_id: 7,
        text: 'Ex minim in ad magna consequat sit fugiat reprehenderit adipisicing aute. Nulla reprehenderit laborum est qui aliqua reprehenderit Lorem esse non et aute. Nulla voluptate sint enim ipsum quis nulla cupidatat deserunt sunt. Exercitation pariatur sit velit fugiat. Lorem et dolor consectetur est velit occaecat et nisi duis sit sit. Ipsum elit quis minim non pariatur aliquip voluptate eu. Minim incididunt consectetur aliqua consectetur officia ex do sunt commodo.',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
    {
        id: 5834,
        user_id: 8,
        text: 'aboba4',
        created_at: '2025-04-27 15:35:51.913506+03',
    },
]

export const Chat = ({ chatId }) => {
    return (
        <div className={s.wrapper}>
            {messages.map((message, index) => {
                return (
                    <Message
                        key={`${message.id} - ${index}`}
                        messageData={message}
                    />
                )
            })}
        </div>
    )
}