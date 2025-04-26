import { useEffect, useState } from 'react';
import s from './Header.module.scss'
import { DefaultButton, HeaderLogo, ThemeSwitch } from '../../../shared';
import { UserDropdownMenu } from '../../../features';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
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
                <HeaderLogo onClick={handleLogoCkick}/>
                <DefaultButton title={'Войти'} onClick={handleAuthBtnCkick} width={'96px'} height='40px'/>
                <UserDropdownMenu name={'Никита'} />
            </div>
        </header>
    )
}