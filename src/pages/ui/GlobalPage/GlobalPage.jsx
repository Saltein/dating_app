import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav, Header, Navigation } from '../../../widgets'
import s from './GlobalPage.module.scss'
import { AuthPage, DatingPage, PageForUnauthorized, ProfilePage, SettingsPage } from '../OtherPages'
import { GoBackButton } from '../../../shared'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../entities/user/model/selectors'
import { LikesPage } from '../OtherPages/LikesPage/LikesPage'

export const GlobalPage = () => {
    const location = useLocation();
    const hideLayoutRoutes = ['/auth']
    const isSimpleLayout = hideLayoutRoutes.includes(location.pathname)

    const token = useSelector(selectToken)

    return (
        <div className={s.wrapper}>
            {!isSimpleLayout ? <Header token={token} /> : <GoBackButton title={'На главную'} href={'/dating'} />}

            {token ?
                <div className={s.pageSpace}>
                    {!isSimpleLayout &&
                        <div className={s.left_nav}>
                            <Navigation />
                        </div>}

                    <div className={s.page}>
                        <Routes>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/dating' element={<DatingPage />} />
                            <Route path='/likes' element={<LikesPage />} />
                            <Route path='/chats' element={<div>chats</div>} />
                            <Route path='/settings' element={<SettingsPage />} />
                        </Routes>
                    </div>
                </div>
                :
                <>
                    <PageForUnauthorized />
                    <Routes>
                        <Route path='/auth' element={<AuthPage />} />
                    </Routes>
                </>
            }

            {!isSimpleLayout &&
                <div className={s.bottom_nav}>
                    <BottomNav />
                </div>
            }
        </div>
    )
}