import s from './Bubble.module.scss'

export const Bubble = ({ title }) => {
    return (
        <div className={s.wrapper}>
            {title}
        </div>
    )
}