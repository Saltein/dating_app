import s from './ChatsNav.module.scss'
import { useState } from 'react'
import { ChatItem } from '../../../entities'
import { DefaultDividerH } from '../../../shared'

export const ChatsNav = ({ chatsList = [] }) => {
    const [currentChat, setCurrentChat] = useState(-1)

    const handleSelectChat = (chat) => {
        setCurrentChat(chat)
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