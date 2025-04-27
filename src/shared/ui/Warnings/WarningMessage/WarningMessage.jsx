import s from './WarningMessage.module.scss'

export const WarningMessage = ({ type = 'error', message = '' }) => {
    return (
        <div className={`
            ${s.wrapper} 
            ${type === 'error' && s.error} 
            ${type === 'success' && s.success}
            ${type === 'neutral' && s.neutral}
        `}>
            {message}
        </div>
    )
}