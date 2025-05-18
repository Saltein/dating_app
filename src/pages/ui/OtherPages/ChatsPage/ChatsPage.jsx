import { SendMessageForm } from '../../../../features'
import { DefaultDividerH, DefaultDividerV } from '../../../../shared/ui'
import { Chat, ChatsNav } from '../../../../widgets/ui'
import s from './ChatsPage.module.scss'

const chatsList = [
    {
        user: {
            id: 71,
            name: 'Aboba 11',
            image: 'https://avatars.mds.yandex.net/i?id=0d7233df241dc140a8f6579150544484_sr-12727346-images-thumbs&n=13'
        },
        chatId: 1231,
        lastMessage: 'Aboba message 11',
    },
    {
        user: {
            id: 72,
            name: 'Aboba 12',
            image: 'https://avatars.mds.yandex.net/i?id=0d7233df241dc140a8f6579150544484_sr-12727346-images-thumbs&n=13'
        },
        chatId: 1232,
        lastMessage: 'Aboba message 12',
    },
    {
        user: {
            id: 73,
            name: 'Aboba 13',
            image: 'https://avatars.mds.yandex.net/i?id=0d7233df241dc140a8f6579150544484_sr-12727346-images-thumbs&n=13'
        },
        chatId: 1233,
        lastMessage: 'Aboba message 13',
    },
]

export const ChatsPage = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.matches}>
                <ChatsNav chatsList={chatsList} />
            </div>
            <DefaultDividerV />
            <div className={s.chat}>
                <Chat />
                <DefaultDividerH />
                <SendMessageForm />
            </div>
        </div>
    )
}