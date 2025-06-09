import { useEffect, useState } from 'react'
import { SendMessageForm } from '../../../../features'
import { DefaultDividerH, DefaultDividerV } from '../../../../shared/ui'
import { Chat, ChatsNav } from '../../../../widgets/ui'
import s from './ChatsPage.module.scss'
import { chatsApi } from '../../../../shared/api/chatsApi'
import { useSelector } from 'react-redux'
import { getId } from '../../../../entities/profile/ui/ProfileSummary/model/summarySelectors'
import { getCurrentMatchChat } from '../../../../entities/chat/model/chatSlice'

export const ChatsPage = () => {
    const [matches, setMatches] = useState([])

    const userId = useSelector(getId)
    const chatId = useSelector(getCurrentMatchChat)

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
                {chatId > 0
                    ?
                    <>
                        <Chat />
                        <DefaultDividerH />
                        <SendMessageForm />
                    </>
                    :
                    <div className={s.chatSpace}>
                        <h3 className={s.noChat}>Выбери кому написать</h3>
                    </div>
                }
            </div>
        </div>
    )
}