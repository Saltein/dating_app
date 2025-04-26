import { AuthFormSwitcher } from '../../../../features'
import { DefaultButton } from '../../../../shared'
import s from './AuthPage.module.scss'

export const AuthPage = () => {
    return (
        <div className={s.wrapper}>
            <AuthFormSwitcher />
        </div>
    )
}