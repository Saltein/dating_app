import s from './Bubble.module.scss'

export const Bubble = ({ title, isButton = false }) => {
    return (
        <div className={`${s.wrapper} ${isButton && s.button}`}>
            {title}
        </div>
    )
}