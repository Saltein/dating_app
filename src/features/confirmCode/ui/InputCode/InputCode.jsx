import { useState } from 'react'
import { DefaultButton } from '../../../../shared'
import s from './InputCode.module.scss'

export const InputCode = () => {
    const [isCodeSent, setCodeSent] = useState(false);

    const handleSendCode = () => {
        // логика отправки кода на почту и т д
        setCodeSent(true)
    }

    const handleCheckCode = () => {
        // логика проверки кода
    }

    return (
        <div className={`${s.wrapper} ${isCodeSent ? s.sent : ''}`}>
            <input
                className={`${s.input} ${isCodeSent ? s.sent : ''}`}
                placeholder='Код подтверждения'
            />
            <DefaultButton
                title={isCodeSent ? 'Проверить код' : 'Получить код'}
                onClick={isCodeSent ? handleCheckCode : handleSendCode}
            />
        </div>
    )
}