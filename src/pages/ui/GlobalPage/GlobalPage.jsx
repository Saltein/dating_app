import { ThemeSwitch } from '../../../shared/ui/Switches/ThemeSwitch/ThemeSwitch'
import { Header } from '../../../widgets'
import s from './GlobalPage.module.scss'

export const GlobalPage = () => {
    return (
        <div className={s.wrapper}>
            <Header />
            <ThemeSwitch />
        </div>
    )
}