import { useTheme } from '../../../context/theme/ThemeContext'
import s from './DefaultButton.module.scss'

export const DefaultButton = ({ title, onClick, height = '48px', width, active = true }) => {
    const { theme } = useTheme()

    return (
        <div
            className={`${s.wrapper} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={onClick}
            style={{
                height: height,
                width: width,
                backgroundColor: !active ? 'var(--color-disabled)' : ''
            }}
        >
            {active &&
                <div className={s.shine}>
                    <div className={s.shine1} />
                    <div className={`${s.shine1} ${s.s}`} />
                </div>}
            {title}
        </div>
    )
}