import s from './DefaultDividerV.module.scss'

export const DefaultDividerV = ({ margin }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.divider} style={{ marginTop: margin, marginBottom: margin }} />
        </div>
    )
}