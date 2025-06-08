import { useEffect, useState } from 'react'
import { SendMessageForm } from '../../../../features'
import { DefaultDividerH, DefaultDividerV } from '../../../../shared/ui'
import { Chat, ChatsNav } from '../../../../widgets/ui'
import s from './ChatsPage.module.scss'
import { chatsApi } from '../../../../shared/api/chatsApi'
import { useSelector } from 'react-redux'
import { getId } from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'

const chatsList = [
    {
        user: {
            id: 71,
            name: 'Валерия',
            image: 'https://i.klerk.ru/-YyS-Car32OV40xwhG_VKo46IjjkHJlEAo8k3E7sOoI/w:1500/aHR0cHM6Ly93d3cu/a2xlcmsucnUvdWdj/L2Jsb2dQb3N0LzUw/MjU0Ny8yNS5wbmc.webp'
        },
        chatId: 1231,
        lastMessage: 'Да, я тоже так думаю',
    },
    {
        user: {
            id: 72,
            name: 'Арина',
            image: 'https://avatars.mds.yandex.net/i?id=22268ecbea8d1fead5c04e48d2fcb7bb_l-4391252-images-thumbs&n=13'
        },
        chatId: 1232,
        lastMessage: 'Спокойной)',
    },
    {
        user: {
            id: 73,
            name: 'Алина',
            image: 'https://i.klerk.ru/h921AIBbmI2ky58QhTvws_RaLS8oc7A9PP2ExrThjgo/w:1500/aHR0cHM6Ly93d3cu/a2xlcmsucnUvdWdj/L2Jsb2dQb3N0LzUw/MjU0Ny8xMS5wbmc.webp'
        },
        chatId: 1233,
        lastMessage: 'Привет sdfg asda asdasd asd asgsdfg sdfsdfg d fsgsdf',
    },
]

export const ChatsPage = () => {
    const [matches, setMatches] = useState([])

    const userId = useSelector(getId)

    const fetchMatches = async () => {
        try {
            const response = await chatsApi.getMatches(userId)
            if (!response) {
                console.log('Неизвестная ошибка получения списка мэтчей')
                return
            }
            setMatches(response)
        } catch (error) {
            console.error('Ошибка получения списка мэтчей:', error)
        }
    }

    useEffect(() => {
        if (!userId) return // Ждём, пока userId появится
        fetchMatches()
    }, [userId])

    return (
        <div className={s.wrapper}>
            <div className={s.matches}>
                <ChatsNav chatsList={matches} />
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