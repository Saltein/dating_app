import { useEffect, useState } from 'react';
import s from './Header.module.scss'
import { ThemeSwitch } from '../../../shared';

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
            <ThemeSwitch />
        </header>
    )
}