import s from './ChatsNav.module.scss'
import { useState } from 'react'
import { ChatItem } from '../../../entities'
import { DefaultDividerH } from '../../../shared'
import { useDispatch } from 'react-redux'
import { setCurrentMatchChat } from '../../../entities/chat/model/chatSlice'

export const ChatsNav = ({ chatsList = [] }) => {
    const [currentChat, setCurrentChat] = useState(-1)

    const dispatch = useDispatch()

    const handleSelectChat = (chat) => {
        setCurrentChat(chat)
        dispatch(setCurrentMatchChat(chat))
    }

    return (
        <div className={s.wrapper}>
            {chatsList.map((chat, index) => {
                return (
                    <div key={`${chat.chatId} - ${index}`}>
                        <ChatItem chatData={chat} currentChat={currentChat} onClick={handleSelectChat} />
                        {index < chatsList.length - 1 && (
                            <DefaultDividerH margin={'8px'} color='var(--color-background)' />
                        )}
                    </div>
                )
            })}
        </div>
    )
}