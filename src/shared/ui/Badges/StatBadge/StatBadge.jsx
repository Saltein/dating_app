import s from './StatBadge.module.scss'

export const StatBadge = ({ title, value, Icon, type }) => {
    return (
        <div className={`${s.wrapper} ${type === 'likes' && s.likes} ${type === 'views' && s.views} `}>
            <div className={s.value_icon}>
                <span className={s.value}>{value}</span>
                {Icon && <Icon className={s.icon} />}
            </div>
            <span className={s.title}>{title}</span>
        </div>
    )
}