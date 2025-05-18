import s from './DefaultDividerH.module.scss'

export const DefaultDividerH = ({ margin, color = 'var(--color-border)' }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.divider} style={{
                marginRight: margin,
                marginLeft: margin,
                backgroundColor: color,
            }} />
        </div>
    )
}