import s from './App.module.scss'
import { GlobalPage } from '../pages'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenExpired } from '../shared/lib/checkTokenExpiration'
import { logoutUser } from '../features/auth/model/authActions'
import { WebSocketProvider } from '../shared/lib/websocket/WebSocketContext'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logoutUser())
    }
  }, [token, dispatch])

  return (
    <div className={s.wrapper}>
      <WebSocketProvider>
        <GlobalPage />
      </WebSocketProvider>
    </div>
  );
}

export default App;
