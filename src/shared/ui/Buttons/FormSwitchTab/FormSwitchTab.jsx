import { useTheme } from '../../../context/theme/ThemeContext'
import s from './FormSwitchTab.module.scss'

export const FormSwitchTab = ({ title, onClick, name, currentTab }) => {
    const { theme } = useTheme()

    const handleTab = () => {
        onClick(name)
    }

    return (
        <div className={`${s.wrapper} ${currentTab === name && s.active} ${theme === 'dark' ? s.dark : s.light} `} onClick={handleTab}>
            <span className={s.title}>
                {title}
            </span>
        </div>
    )
}