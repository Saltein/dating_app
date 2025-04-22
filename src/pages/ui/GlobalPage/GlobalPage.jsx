import { Route, Routes } from 'react-router-dom'
import { Header, Navigation } from '../../../widgets'
import s from './GlobalPage.module.scss'

export const GlobalPage = () => {
    return (
        <div className={s.wrapper}>
            <Header />
            <div className={s.pageSpace}>
                <div className={s.nav}>
                    <Navigation />
                </div>


                <div className={s.page}>
                    <Routes>
                        <Route path='/dating' element={<div>page</div>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}