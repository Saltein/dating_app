import s from './DefaultDividerH.module.scss'

export const DefaultDividerH = ({ margin }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.divider} style={{ marginRight: margin, marginLeft: margin }} />
        </div>
    )
}