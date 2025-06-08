import s from './Message.module.scss'
import { useSelector } from 'react-redux'
import { formatDate } from '../../.'
import { getId } from '../../../entities/profile/ui/ProfileSummary/model/summarySelectors'
import { useTheme } from '../../../shared/context/theme/ThemeContext'
import { useLayoutEffect, useRef, useState } from 'react'

export const Message = ({ messageData }) => {
    const userId = useSelector(getId)
    const theme = useTheme().theme
    const isMyMessage = (userId === messageData.sender_id) || (messageData.sender_id === -20)

    const [mode, setMode] = useState('single');
    const msgRef = useRef(null);

    useLayoutEffect(() => {
        const el = msgRef.current;
        if (el) {
            const style = window.getComputedStyle(el);
            const lineHeight = parseFloat(style.lineHeight);

            if (el.clientHeight > lineHeight * 1.01) {
                setMode('multi');
            } else {
                setMode('single');
            }
        }
    }, [messageData.content]);

    return (
        <div className={[
            s.wrapper,
            isMyMessage ? s.my : '',
            theme === 'dark' ? s.dark : s.light,
            s[mode]
        ].join(' ')}>
            <span ref={msgRef} className={s.message}>{messageData.content}</span>
            <span className={s.time}>{formatDate(messageData.sent_at, false, true)}</span>
        </div>
    )
}