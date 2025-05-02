import s from './Bubble.module.scss'
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/add.svg'

export const Bubble = ({ title, isButton = false, isEditing = false, onClick, isCurrent = false }) => {
    return (
        <div className={`${s.wrapper} ${isButton ? s.button : ''} ${isEditing ? s.edit : ''} ${isCurrent ? s.current : ''}`} onClick={onClick}>
            {isEditing && <DeleteIcon className={s.deleteIcon} />}
            <span className={s.title}>{title}</span>
        </div>
    )
}