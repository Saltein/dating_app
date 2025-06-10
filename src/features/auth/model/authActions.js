import { setToken, clearToken } from '../../../entities/user/model/slice'
import { authApi } from '../../../shared/api/authApi'

export const loginUser = (credentials, navigate, setError) => async (dispatch) => {
    try {
        const response = await authApi.login(credentials)
        if (response?.token) {
            localStorage.setItem('token', response.token)
            dispatch(setToken(response.token))
            navigate('/dating')
        }
    } catch (error) {
        console.error('Ошибка логина:', error.message)
        setError('Ошибка входа')
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch(clearToken())
};