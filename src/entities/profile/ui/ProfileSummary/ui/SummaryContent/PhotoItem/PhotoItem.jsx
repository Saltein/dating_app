import s from './PhotoItem.module.scss'
import { ReactComponent as AddIcon } from '../../../../../../../shared/assets/icons/add.svg'

export const PhotoItem = ({ photo, handleAdd, handleDelete, photoCount = 0 }) => {
    return (
        <div className={s.wrapper}>
            {photo ? (
                <div className={`${s.delete}`} onClick={() => handleDelete(photo)} >
                    <img className={s.photo} src={photo} alt="avatar" />
                    <div className={s.deleteIconDiv}>
                        <AddIcon className={s.deleteIcon} />
                    </div>
                </div>
            ) : (photoCount < 10 
                &&
                <div className={s.add} onClick={handleAdd}>
                    <AddIcon className={s.addIcon} />
                </div>
            )}
        </div>
    )
}