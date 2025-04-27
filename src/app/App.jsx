import s from './App.module.scss'
import { GlobalPage } from '../pages'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenExpired } from '../shared/lib/checkTokenExpiration'
import { logoutUser } from '../features/auth/model/authActions'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logoutUser())
    }
  }, [token, dispatch])

  return (
    <div className={s.wrapper}>
      <GlobalPage />
    </div>
  );
}

export default App;
