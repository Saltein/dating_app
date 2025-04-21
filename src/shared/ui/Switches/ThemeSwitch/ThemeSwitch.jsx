import s from './ThemeSwitch.module.scss'
import { useEffect, useState } from 'react'
import { DefaultSwitch } from '../DefaultSwitch/DefaultSwitch'
import { setTheme } from '../../../lib/themeManager'

export const ThemeSwitch = () => {
    const [isOn, setOn] = useState(false)

    useEffect(() => {
        let theme = ''
        isOn ? theme = 'dark' : theme = 'light'
        setTheme(theme)
    }, [isOn])

    return (
        <div className={s.wrapper}>
            <span>Темная тема</span>
            <DefaultSwitch state={isOn} onSwitch={setOn} />
        </div>
    )
}