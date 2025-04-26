import { useState } from 'react'
import { DefaultButton } from '../../../../shared'
import s from './AuthForm.module.scss'
import { useTheme } from '../../../../shared/context/theme/ThemeContext';
import { InputCode } from '../../..';

const PHONE_PATTERN = '^(?=(?:.*\\d){11,})[+\\d\\s\\-\\(\\)]+$'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = new RegExp(PHONE_PATTERN);

export const AuthForm = ({ inputs = [], buttonTitle }) => {
    const { theme } = useTheme()

    const [formData, setFormData] = useState({})

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value // Динамическое обновление поля по имени инпута
        }))
    }


    // TO DO вывод ошибок на экран, отправка формы
    const handleSubmit = () => {
        console.log(formData)

        if (Object.keys(formData).length !== 7) {
            console.log("Заполните все поля!", formData.length)
            return
        }

        if (!EMAIL_REGEX.test(formData.email)) {
            console.log("Некорректный email");
            return;
        }

        if (formData.password !== formData.passwordCheck) {
            console.log("Пароли не совпадают")
            return
        }

        console.log("Успешная (тест) регистрация", formData)
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
                        : <InputCode/>
                    )
                })}
            </div>

            <DefaultButton title={buttonTitle} color={'#8a4fff'} onClick={handleSubmit} />
        </div>
    )
}
