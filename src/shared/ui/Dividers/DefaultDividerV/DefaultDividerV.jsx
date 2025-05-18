import s from './DefaultDividerV.module.scss'

export const DefaultDividerV = ({ margin, color = 'var(--color-border)' }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.divider} style={{
                marginTop: margin,
                marginBottom: margin,
                backgroundColor: color,
            }} />
        </div>
    )
}