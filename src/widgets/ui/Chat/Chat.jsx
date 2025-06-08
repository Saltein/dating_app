import s from './Chat.module.scss'
import { Message } from '../../../shared/ui'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentMatchChat } from '../../../entities/chat/model/chatSlice'
import { useWebSocket } from '../../../shared/lib/websocket/WebSocketContext'

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const chatId = useSelector(getCurrentMatchChat)
    const socket = useWebSocket()

    useEffect(() => {
        if (!socket || !chatId) return
        // Join chat room
        socket.emit('joinRoom', chatId)
        // Load initial messages via REST or WS
        socket.emit('getMessages', chatId)
        // Receive message history
        socket.on('messageHistory', history => {
            setMessages(history)
        })
        // Listen for incoming new messages
        socket.on('newMessage', message => {
            if (message.match_id === chatId) {
                setMessages(prev => [...prev, message])
            }
        })
        // Clean up listeners on unmount / chatId change
        return () => {
            socket.emit('leaveRoom', chatId)
            socket.off('messageHistory')
            socket.off('newMessage')
        }
    }, [socket, chatId])

    return (
        <div className={s.wrapper}>
            <div className={s.messages}>
                {messages.map(msg => (
                    <Message key={msg.id} messageData={msg} />
                ))}
            </div>
        </div>
    )
}