import s from './SignInButton.module.scss'
import { useNavigate } from 'react-router-dom'
import { DefaultButton } from '../DefaultButton/DefaultButton'

export const SignInButton = () => {
    const navigate = useNavigate()

    const handleAuthBtnClick = () => {
        navigate('/auth')
    }

    return (
        <div className={s.wrapper}>
            <DefaultButton title={'Войти'} onClick={handleAuthBtnClick} width={'96px'} height='40px' />
            <span>/</span>
            <div onClick={handleAuthBtnClick} className={s.registerLink}>Зарегистрироваться</div>
        </div>
    )
}