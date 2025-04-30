import s from './EditButton.module.scss'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'

export const EditButton = ({ onClick }) => {
    return (
        <div className={s.wrapper} onClick={onClick}>
            <EditIcon className={s.editIcon} />
        </div>
    )
}