import { useState } from 'react'
import { DefaultButton } from '../../../../shared'
import s from './AuthForm.module.scss'
import { useTheme } from '../../../../shared/context/theme/ThemeContext';
import { InputCode } from '../../..';
import { authApi } from '../../../../shared/api/authApi';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AuthForm = ({ inputs = [], buttonTitle, isLogin = false }) => {
    const { theme } = useTheme()

    const [formData, setFormData] = useState(
        inputs.reduce((acc, input) => {
            acc[input.name] = '';
            return acc;
        }, {})
    );

    const [isCodeVerified, setCodeVerified] = useState(false)

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
    }

    const handleSubmit = async () => {
        console.log(formData)

        if (Object.keys(formData).length !== 6) {
            console.log("Заполните все поля!", formData.length)
            return
        }

        if (!EMAIL_REGEX.test(formData.email)) {
            console.log("Некорректный email");
            return
        }

        if (!isCodeVerified) {
            console.log("Подтвердите Email")
            return
        }

        if (formData.password !== formData.passwordCheck) {
            console.log("Пароли не совпадают")
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
            console.log("Успешная (тест) регистрация", formData, response)
        } catch (error) {
            console.error('Ошибка аутентификации:', error.message);
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

            <DefaultButton title={buttonTitle} color={'#8a4fff'} onClick={handleSubmit} />
        </div>
    )
}
