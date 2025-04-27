import { useState } from 'react'
import { DefaultButton, WarningMessage } from '../../../../shared'
import s from './AuthForm.module.scss'
import { useTheme } from '../../../../shared/context/theme/ThemeContext';
import { InputCode } from '../../..';
import { authApi } from '../../../../shared/api/authApi';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../model/authActions';
import { useNavigate } from 'react-router-dom';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AuthForm = ({ inputs = [], buttonTitle, isLogin, setCurrentTab, tabs = [] }) => {
    const { theme } = useTheme()
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleRegister = async () => {
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
            let response = await authApi.register(formData);
            if (response) {
                console.log("Успешная (тест) регистрация", formData, response)
                setCurrentTab(tabs[0])
            } else {
                setError("Ошибка регистрации")
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
            setError(`Ошибка регистрации: ${error.message}`)
        }
    }

    const handleLogin = async () => {
        setError('')

        try {
            const { email, password } = formData;
            await dispatch(loginUser({ email, password }));
            navigate('/dating')
        } catch (error) {
            console.error('Ошибка авторизации:', error.message);
            setError(`Ошибка авторизации: ${error.message}`)
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
            <DefaultButton title={buttonTitle} color={'#8a4fff'} onClick={isLogin ? handleLogin : handleRegister} />
        </div>
    )
}
