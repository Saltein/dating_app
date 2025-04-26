import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav, Header, Navigation } from '../../../widgets'
import s from './GlobalPage.module.scss'
import { AuthPage, SettingsPage } from '../OtherPages'
import { GoBackButton } from '../../../shared'

export const GlobalPage = () => {
    const location = useLocation();
    const hideLayoutRoutes = ['/auth']
    const isSimpleLayout = hideLayoutRoutes.includes(location.pathname)

    return (
        <div className={s.wrapper}>
            {!isSimpleLayout ? <Header /> : <GoBackButton title={'На главную'} href={'/dating'}/>}
            <div className={s.pageSpace}>
                {!isSimpleLayout && 
                <div className={s.left_nav}>
                    <Navigation />
                </div>}

                <div className={s.page}>
                    <Routes>
                        <Route path='/profile' element={<div>profile</div>} />
                        <Route path='/dating' element={<div>dating</div>} />
                        <Route path='/likes' element={<div>likes</div>} />
                        <Route path='/chats' element={<div>chats</div>} />
                        <Route path='/settings' element={<SettingsPage />} />
                        <Route path='/auth' element={<AuthPage />} />
                    </Routes>
                </div>
            </div>
            {!isSimpleLayout && 
            <div className={s.bottom_nav}>
                <BottomNav />
            </div>}
        </div>
    )
}