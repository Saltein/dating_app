import { useNavigate } from 'react-router-dom'
import { SignInButton } from '../../../../../../shared'
import s from './HeroBlock.module.scss'

export const HeroBlock = () => {
    const navigate = useNavigate()

    return (
        <div className={s.wrapper}>
            <div className={s.titles}>
                <h1 className={s.title}>Ваша история начинается
                    <span className={s.accent} onClick={() => navigate('/auth')}> здесь</span>
                </h1>
                <h2 className={s.subtitle}>Простая регистрация, умный подбор и мгновенные знакомства по всей России.</h2>
            </div>
            <div className={s.buttons}>
                <span className={s.label}>Зарегистрируйся сейчас!</span>
                <SignInButton />
            </div>
        </div>
    )
}