import { Route, Routes } from 'react-router-dom'
import { BottomNav, Header, Navigation } from '../../../widgets'
import s from './GlobalPage.module.scss'
import { SettingsPage } from '../OtherPages'

export const GlobalPage = () => {
    return (
        <div className={s.wrapper}>
            <Header />
            <div className={s.pageSpace}>
                <div className={s.left_nav}>
                    <Navigation />
                </div>

                <div className={s.page}>
                    <Routes>
                        <Route path='/profile' element={<div>profile</div>} />
                        <Route path='/dating' element={<div>dating</div>} />
                        <Route path='/likes' element={<div>likes</div>} />
                        <Route path='/chats' element={<div>chats</div>} />
                        <Route path='/settings' element={<SettingsPage />} />
                    </Routes>
                </div>
            </div>
            <div className={s.bottom_nav}>
                <BottomNav />
            </div>
        </div>
    )
}