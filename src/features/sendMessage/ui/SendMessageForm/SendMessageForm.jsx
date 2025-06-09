import s from './SendMessageForm.module.scss'
import { ReactComponent as SendIcon } from '../../../../shared/assets/icons/send.svg'
import { useState } from 'react'
import { useWebSocket } from '../../../../shared/lib/websocket/WebSocketContext'
import { useSelector } from 'react-redux'
import { getCurrentMatchChat } from '../../../../entities/chat/model/chatSlice'

export const SendMessageForm = () => {
    const [text, setText] = useState('')
    const socket = useWebSocket()
    const chatId = useSelector(getCurrentMatchChat)

    const sendMessage = () => {
        if (!text.trim() || !socket || !chatId) return
        const messagePayload = { chatId, text }
        socket.emit('sendMessage', messagePayload)
        setText('')
    }

    return (
        <div className={s.wrapper}>
            <div className={s.inputMessage}>
                <input
                    maxLength={4096}
                    className={s.input}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Напиши сообщение..."
                />
            </div>
            <SendIcon className={s.send} onClick={sendMessage} />
        </div>
    )
}