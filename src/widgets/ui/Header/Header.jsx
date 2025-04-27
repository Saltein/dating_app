import { useEffect, useState } from 'react';
import s from './Header.module.scss'
import { DefaultButton, HeaderLogo } from '../../../shared';
import { UserDropdownMenu } from '../../../features';
import { useNavigate } from 'react-router-dom';

export const Header = ({ token }) => {
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)

    const handleAuthBtnCkick = () => {
        navigate('/auth')
    }
    const handleLogoCkick = () => {
        navigate('/dating')
    }

    useEffect(() => {
        const toggleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", toggleScroll);
        return () => window.removeEventListener("scroll", toggleScroll);
    }, [])


    return (
        <header className={`${s.wrapper} ${isScrolled ? s.scrolled : ''}`}>
            <div className={s.container}>
                <HeaderLogo onClick={handleLogoCkick} />
                {token
                    ? <UserDropdownMenu name={'Никита'} />
                    :
                    <div className={s.authButtons}>
                        <DefaultButton title={'Войти'} onClick={handleAuthBtnCkick} width={'96px'} height='40px' />
                        <div onClick={handleAuthBtnCkick} className={s.registerLink}>Зарегистрироваться</div>
                    </div>
                }
            </div>
        </header>
    )
}