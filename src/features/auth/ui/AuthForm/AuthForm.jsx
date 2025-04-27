import { useState } from 'react'
import { DefaultButton, WarningMessage } from '../../../../shared'
import s from './AuthForm.module.scss'
import { useTheme } from '../../../../shared/context/theme/ThemeContext';
import { InputCode } from '../../..';
import { authApi } from '../../../../shared/api/authApi';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AuthForm = ({ inputs = [], buttonTitle, isLogin = false, setCurrentTab, tabs = [] }) => {
    const { theme } = useTheme()

    const [formData, setFormData] = useState(
        inputs.reduce((acc, input) => {
            if (input.name !== 'code') {
                acc[input.name] = '';
            }
            return acc;
        }, {})
    );
    const [isCodeVerified, setCodeVerified] = useState(false)
    const [error, setError] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (!name) {
            console.error("Input doesn't have name attribute");
            return;
        }
        if (name === 'code') {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            setCodeVerified(false); // Сбрасываем подтверждение при изменении email
        }

        setError('')
    }

    const handleSubmit = async () => {
        console.log(formData)
        setError('')

        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
        if (!allFieldsFilled) {
            setError('Заполните все поля!')
            return;
        }

        if (!EMAIL_REGEX.test(formData.email)) {
            setError('Некорректный email!')
            return
        }

        if (!isCodeVerified) {
            setError('Подтвердите email!')
            return
        }

        if (formData.password !== formData.passwordCheck) {
            setError('Пароли не совпадают!')
            return
        }

        try {
            let response
            if (isLogin) {
                const { email, password } = formData;
                response = await authApi.login({ email, password });
            } else {
                response = await authApi.register(formData);
            }
            if(response) {
                console.log("Успешная (тест) регистрация", formData, response)
                setCurrentTab(tabs[0])
            } else {
                setError("Ошибка регистрации")
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error.message);
            setError(`Ошибка аутентификации: ${error.message}`)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.inputs}>
                {inputs.map((input, index) => {
                    return (
                        input.name !== 'code'
                            ? <input
                                className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
                                onChange={handleOnChange}
                                name={input.name}
                                key={index}
                                type={input.type}
                                placeholder={input.placeholder}
                            />
                            : <InputCode key={index} email={formData.email} setState={setCodeVerified} />
                    )
                })}
            </div>

            {error && <WarningMessage type='error' message={error} />}
            <DefaultButton title={buttonTitle} color={'#8a4fff'} onClick={handleSubmit} />
        </div>
    )
}
