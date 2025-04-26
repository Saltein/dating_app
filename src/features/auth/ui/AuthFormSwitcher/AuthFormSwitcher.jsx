import styles from './AuthFormSwitcher.module.scss'
import { useState, useEffect, useRef } from 'react'
import { AuthForm } from '../.'
import { FormSwitchTab } from '../../../../shared'

const loginInputs = [
    {
        name: 'email',
        placeholder: 'Электронная почта',
        type: 'email',
    },
    {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password',
    },
]

const registrationInputs = [
    {
        name: 'name',
        placeholder: 'Имя',
        type: 'text',
    },
    {
        name: 'email',
        placeholder: 'Электронная почта',
        type: 'email',
    },
    {
        name: 'code',
        placeholder: 'Код подтверждения',
        type: 'text',
    },
    {
        name: 'dateOfBirth',
        placeholder: 'Дата рождения',
        type: 'date',
    },
    {
        name: 'city',
        placeholder: 'Город',
        type: 'text',
    },
    {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password',
    },
    {
        name: 'passwordCheck',
        placeholder: 'Повторите пароль',
        type: 'password',
    },
]

export const AuthFormSwitcher = () => {

    const tabs = ['login', 'registration']
    const [currentTab, setCurrentTab] = useState(tabs[0])
    const [height, setHeight] = useState(0)

    const contentRef = useRef(null)

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
        }
    }, [currentTab])

    const handleLoginTab = (tab) => {
        setCurrentTab(tab)
    }
    const handleRegistrationTab = (tab) => {
        setCurrentTab(tab)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <FormSwitchTab title={'Вход'} onClick={handleLoginTab} name={tabs[0]} currentTab={currentTab} />
                <FormSwitchTab title={'Регистрация'} onClick={handleRegistrationTab} name={tabs[1]} currentTab={currentTab} />
            </div>

            <div
                className={styles.contentWrapper}
                style={{ height: `${height}px` }}
            >
                <div ref={contentRef}>
                    {currentTab === tabs[0] && (
                        <AuthForm buttonTitle="Войти" inputs={loginInputs} />
                    )}
                    {currentTab === tabs[1] && (
                        <AuthForm buttonTitle="Зарегистрироваться" inputs={registrationInputs} />
                    )}
                </div>
            </div>
        </div>
    )
}