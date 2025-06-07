import s from './GlobalPage.module.scss'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { BottomNav, Header, Navigation } from '../../../widgets'
import { AuthPage, ChatsPage, DatingPage, PageForUnauthorized, ProfilePage, SettingsPage } from '../OtherPages'
import { GoBackButton } from '../../../shared'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../../entities/user/model/selectors'
import { LikesPage } from '../OtherPages/LikesPage/LikesPage'
import { buttonsList } from './lib/navButtonsList'
import { profileApi } from '../../../shared/api/profileApi'
import { setAll } from '../../../entities/profile/ui/ProfileSummary/model/summarySlice'
import { useEffect } from 'react'

export const GlobalPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const hideLayoutRoutes = ['/auth']
    const isSimpleLayout = hideLayoutRoutes.includes(location.pathname)

    const token = useSelector(selectToken)

    const getProfile = async () => {
        try {
            const response = await profileApi.getProfile()
            if (response) {
                dispatch(setAll(response))
            } else {
                console.log("Неизвестная ошибка получения профиля")
            }
        } catch (error) {
            console.log("Ошибка получения профиля", error)
        }
    }

    useEffect(() => {
        if (token) {
            getProfile()
        }
    }, [token])

    useEffect(() => {
        if (!token) {
            navigate('/welcome')
        }
    }, [token])

    return (
        <div className={s.wrapper}>
            {!isSimpleLayout ? <Header token={token} /> : <GoBackButton title={'На главную'} href={'/welcome'} />}

            {token ?
                <div className={s.pageSpace}>
                    {!isSimpleLayout &&
                        <div className={s.left_nav}>
                            <Navigation buttonsList={buttonsList} />
                        </div>}

                    <div className={s.page}>
                        <Routes>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/dating' element={<DatingPage />} />
                            <Route path='/likes' element={<LikesPage />} />
                            <Route path='/chats' element={<ChatsPage />} />
                            <Route path='/settings' element={<SettingsPage />} />
                        </Routes>
                    </div>
                </div>
                :
                <>
                    <Routes>
                        <Route path='/welcome' element={<PageForUnauthorized />} />
                        <Route path='/auth' element={<AuthPage />} />
                    </Routes>
                </>
            }

            {!isSimpleLayout && token &&
                <div className={s.bottom_nav}>
                    <BottomNav />
                </div>
            }
        </div>
    )
}