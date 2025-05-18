import s from './SendMessageForm.module.scss'
import { ReactComponent as SendIcon } from '../../../../shared/assets/icons/send.svg'

export const SendMessageForm = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.inputMessage}>
                <input className={s.input} />
            </div>
            <SendIcon className={s.send} />
        </div>
    )
}