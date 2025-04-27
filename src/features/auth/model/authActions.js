import { setToken, clearToken } from '../../../entities/user/model/slice';
import { authApi } from '../../../shared/api/authApi';

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await authApi.login(credentials);
        if (response?.token) {
            dispatch(setToken(response.token));
            console.log('токен', response.token)
        }
    } catch (error) {
        console.error('Ошибка логина:', error.message);
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(clearToken());
};