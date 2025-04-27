import { useState, useEffect } from 'react'
import { DefaultButton } from '../../../../shared'
import s from './InputCode.module.scss'
import { authApi } from '../../../../shared/api/authApi';

export const InputCode = ({ email, setState }) => {
    const [isCodeSent, setCodeSent] = useState(false)
    const [isCodeVerified, setCodeVerified] = useState(false)
    const [code, setCode] = useState('')
    const [error, setError] = useState('')

    const handleSendCode = async () => {
        try {
            let formData = {
                "email": email,
            }
            let response = await authApi.sendCode(formData);
            if (response) {
                console.log("Код отправлен", response)
            } else {
                console.log("Код не отправлен")
                setError("Проверьте правильность написания почты")
            }
            response ? setCodeSent(true) : setCodeSent(false)
        } catch (error) {
            console.error('Ошибка отправки кода:', error.message);
        }
    }

    const handleCheckCode = async () => {
        if (!/^\d{6}$/.test(code)) {
            setError('Код должен состоять из 6 цифр');
            return;
        }
        setError('');

        try {
            let formData = {
                "email": email,
                "code": code,
            }
            let response = await authApi.verifyCode(formData);
            if (response) {
                console.log("Email подтверждён", formData, response);
                setCodeVerified(true);
                setState(true);
            }
            else {
                setError('Ошибка подтверждения кода')
                setCodeVerified(false);
                setState(false);
            }
        } catch (error) {
            console.error('Ошибка подтверждения кода:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'Ошибка подтверждения кода');
        }
    }

    const handleInputChange = (e) => {
        setCode(e.target.value);
    }

    useEffect(() => {
        setCodeSent(false);
        setCodeVerified(false);
        setCode('');
        setError('');
        setState(false); // Сбрасываем в родителе (AuthForm) подтверждение тоже
    }, [email]);

    return (
        <>   
            <div className={`${s.wrapper} ${isCodeSent ? s.sent : ''} ${isCodeVerified ? s.verified : ''}`}>
                <input
                    className={`${s.input} ${isCodeSent ? s.sent : ''}`}
                    maxLength="6"
                    onChange={handleInputChange}
                    value={code}
                    placeholder='Код подтверждения'
                    style={code.length !== 0 ? {
                        letterSpacing: '24px',
                        fontSize: '24px', paddingLeft: '24px',
                        paddingRight: '0', textAlign: 'center'
                    } : {}}
                />
                <DefaultButton
                    title={isCodeSent ? 'Проверить код' : 'Получить проверочный код'}
                    onClick={isCodeSent ? handleCheckCode : handleSendCode}
                />
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            {isCodeVerified && <div className={s.message}>Email подтверждён!</div>}
        </>
    )
}