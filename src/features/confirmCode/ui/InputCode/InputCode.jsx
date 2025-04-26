import { useState } from 'react'
import { DefaultButton } from '../../../../shared'
import s from './InputCode.module.scss'

export const InputCode = () => {
    const [isCodeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState('')
    const [error, setError] = useState('');

    const handleSendCode = () => {
        // логика отправки кода на почту и т д
        setCodeSent(true)
    }

    const handleCheckCode = () => {
        if (!/^\d{6}$/.test(code)) {
            setError('Код должен состоять из 6 цифр');
            return;
        }
        setError('');
        // логика проверки кода
        console.log('Проверяем код:', code);
    }

    const handleInputChange = (e) => {
        setCode(e.target.value);
    }

    return (
        <>
            <div className={`${s.wrapper} ${isCodeSent ? s.sent : ''}`}>
                <input
                    className={`${s.input} ${isCodeSent ? s.sent : ''}`}
                    maxLength="6"
                    onChange={handleInputChange}
                    value={code}
                    placeholder='Код подтверждения'
                    style={code.length !== 0 ? {letterSpacing: '24px', 
                        fontSize: '24px', paddingLeft: '24px', 
                        paddingRight: '0', textAlign: 'center'} : {}}
                />
                <DefaultButton
                    title={isCodeSent ? 'Проверить код' : 'Получить код'}
                    onClick={isCodeSent ? handleCheckCode : handleSendCode}
                />
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
        </>
    )
}