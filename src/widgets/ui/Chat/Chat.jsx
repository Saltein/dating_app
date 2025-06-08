import s from './Chat.module.scss'
import { Message } from '../../../shared/ui'
import { useEffect, useState } from 'react'
import { chatsApi } from '../../../shared/api/chatsApi'
import { useSelector } from 'react-redux'
import { getCurrentMatchChat } from '../../../entities/chat/model/chatSlice'

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const chatId = useSelector(getCurrentMatchChat)

    const fetchMessages = async () => {
        try {
            const response = await chatsApi.getMessages(chatId)
            if (!response) {
                console.log('Неизвестная ошибка получения списка сообщений')
                return
            }
            setMessages(response)
            console.log('messages', response)
        } catch (error) {
            console.error('Ошибка получения списка сообщений:', error)
        }
    }

    useEffect(() => {
        if (!chatId) return
        fetchMessages()
    }, [chatId])

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