import s from './Bubble.module.scss'
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/add.svg'
import { useTheme } from '../../../../context/theme/ThemeContext'

export const Bubble = ({ obj, title, isButton = false, isEditing = false, onClick, isCurrent = false, isAddable = false, disabled = false }) => {
    const theme = useTheme().theme

    const handleClick = () => {
        if (disabled) return
        if (!obj) onClick?.()
        else onClick(obj)
    }

    return (
        <div
            className={`
                ${s.wrapper} 
                ${isButton ? s.button : ''} 
                ${isEditing ? s.edit : ''} 
                ${isCurrent ? s.current : ''}
                ${theme === 'dark' ? s.dark : s.light}
                ${isAddable ? s.addable : ''}
                ${disabled ? s.disabled : ''}
                `
            }
            onClick={handleClick}
        >
            {isEditing && <DeleteIcon className={s.deleteIcon} />}
            <span className={s.title}>{title}</span>
        </div>
    )
}