import { Bubble } from '../../../../../../shared'
import s from './SummaryBlock.module.scss'
import { ReactComponent as FilmIcon } from '../../../../../../shared/assets/icons/film.svg'
import { ReactComponent as BookIcon } from '../../../../../../shared/assets/icons/book.svg'

export const SummaryBlock = ({ title = 'no title', params, isBubble = true }) => {
    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>
            {isBubble
                ?
                <div className={s.bubbleList}>
                    {params.map((param, index) => {
                        return (
                            <Bubble title={param} key={index} />
                        )
                    })}
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