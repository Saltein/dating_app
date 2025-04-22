import s from './NavButton.module.scss'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/theme/ThemeContext';

export const NavButton = ({ title, href, Icon, onClick, currentPage }) => {
    const navigate = useNavigate()
    const { theme } = useTheme();

    const handleClick = (e) => {
        e.preventDefault()
        if (href) {
            navigate(href)
        }
        onClick(href)
        console.log(title)
    }

    return (
        <div className={`${s.link} ${currentPage === href ? s.current : ''} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={handleClick}
        >
            <Icon className={s.icon} />
            <span className={s.title}>{title}</span>
        </div>
    )
}