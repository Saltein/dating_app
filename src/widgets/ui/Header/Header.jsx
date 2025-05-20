import { useEffect, useState } from 'react';
import s from './Header.module.scss'
import { DefaultButton, HeaderLogo, SignInButton } from '../../../shared';
import { UserDropdownMenu } from '../../../features';
import { useNavigate } from 'react-router-dom';

export const Header = ({ token }) => {
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)

    const handleLogoClick = () => {
        navigate(token ? '/dating' : '/welcome')
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
                <HeaderLogo onClick={handleLogoClick} />
                {token
                    ? <UserDropdownMenu name={'Никита'} />
                    :
                    <div className={s.authButtons}>
                        <SignInButton />
                    </div>
                }
            </div>
        </header>
    )
}