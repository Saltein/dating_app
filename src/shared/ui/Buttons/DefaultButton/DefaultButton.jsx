import { useTheme } from '../../../context/theme/ThemeContext'
import s from './DefaultButton.module.scss'

export const DefaultButton = ({ title, onClick, height = '48px', width }) => {
    const { theme } = useTheme()

    return (
        <button
            className={`${s.wrapper} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={onClick}
            style={{height: height, width: width}}
        >
            {title}
        </button>
    )
}