import s from './HeaderLogo.module.scss'
import logo from './assets/logo.bmp'
import logoLetters from './assets/logoLetters.png'

export const HeaderLogo = ({onClick}) => {
    return (
        <div className={s.wrapper} onClick={onClick}>
            <img src={logo} className={s.logo} />
            <img src={logoLetters} className={s.logo} />
        </div>
    )
}