import s from './SettingsButton.module.scss'

export const SettingsButton = ({ title, Control, color }) => {
    return (
        <div className={s.wrapper}>
            <span style={color ? { color: color } : {}}>{title}</span>
            {Control && Control}
        </div>
    )
}