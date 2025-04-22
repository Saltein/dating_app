import { useEffect, useState } from 'react';
import s from './Header.module.scss'
import { HeaderLogo, ThemeSwitch } from '../../../shared';
import { UserDropdownMenu } from '../../../features';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

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
                <HeaderLogo />
                <ThemeSwitch />
                <UserDropdownMenu name={'Никита'} />
            </div>
        </header>
    )
}