import s from './PhotoItem.module.scss'
import { ReactComponent as AddIcon } from '../../../../../../../shared/assets/icons/add.svg'

export const PhotoItem = ({ photo, handleAdd }) => {
    return (
        <div className={s.wrapper}>
            {photo && <img className={s.photo} src={photo} />}
            {!photo && <div className={s.add} onClick={handleAdd}><AddIcon className={s.addIcon} /></div>}
        </div>
    )
}