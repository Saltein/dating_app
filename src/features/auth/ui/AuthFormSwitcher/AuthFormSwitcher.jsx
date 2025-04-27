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
        name: 'first_name',
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
    const contentRef = useRef()

    // Обновляем высоту при изменениях размера контента
    useEffect(() => {
        if (!contentRef.current) return

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                // Используем scrollHeight, чтобы учесть весь контент
                setHeight(entry.target.scrollHeight)
            }
        })

        observer.observe(contentRef.current)

        return () => {
            observer.disconnect()
        }
    }, []) // пустой массив — создаём один раз при монтировании

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <FormSwitchTab title="Вход" onClick={() => setCurrentTab(tabs[0])} name={tabs[0]} currentTab={currentTab} />
                <FormSwitchTab title="Регистрация" onClick={() => setCurrentTab(tabs[1])} name={tabs[1]} currentTab={currentTab} />
            </div>
            <div
                className={styles.contentWrapper}
                style={{ height: `${height}px` }}
            >
                <div ref={contentRef}>
                    {currentTab === tabs[0]
                        ? <AuthForm buttonTitle="Войти" inputs={loginInputs} isLogin={true} setCurrentTab={setCurrentTab} tabs={tabs} />
                        : <AuthForm buttonTitle="Зарегистрироваться" inputs={registrationInputs} setCurrentTab={setCurrentTab} tabs={tabs} />
                    }
                </div>
            </div>
        </div>
    )
}