import { Bubble } from '../../../../../../shared'
import s from './SummaryBlock.module.scss'
import { ReactComponent as FilmIcon } from '../../../../../../shared/assets/icons/film.svg'
import { ReactComponent as BookIcon } from '../../../../../../shared/assets/icons/book.svg'
import { useDispatch } from 'react-redux'
import { removeParam } from '../../model/summarySlice'

export const SummaryBlock = ({ title = 'no title', params, isBubble = true, isEditing, paramKey }) => {
    const dispatch = useDispatch()

    const handleRemove = (id) => {
        dispatch(removeParam({ key: paramKey, value: id }))
        console.log('remove', id)
    }

    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>
            {isBubble
                ?
                <div className={s.bubbleList}>
                    {params.map((param, index) => {
                        return (
                            <Bubble title={param.title} key={index} isEditing={isEditing} onClick={isEditing ? () => handleRemove(param.id) : undefined} />
                        )
                    })}
                    {isEditing && <Bubble title={'+'} isButton />}
                </div>
                :
                <div className={s.filmsBooks}>
                    <div className={s.param}>
                        <FilmIcon className={s.icon} />
                        <span className={s.text}>{params.films}</span>
                    </div>
                    <div className={s.param}>
                        <BookIcon className={s.icon} />
                        <span className={s.text}>{params.books}</span>
                    </div>
                </div>
            }

        </div>
    )
}