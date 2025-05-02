import s from './Bubble.module.scss'
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/add.svg'

export const Bubble = ({ title, isButton = false, isEditing = false, onClick }) => {
    return (
        <div className={`${s.wrapper} ${isButton ? s.button : ''} ${isEditing ? s.edit : ''}`} onClick={onClick}>
            {isEditing && <DeleteIcon className={s.deleteIcon} />}
            <span className={s.title}>{title}</span>
        </div>
    )
}