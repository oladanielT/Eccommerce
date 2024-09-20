import axios from './axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { userAuthStore } from '../store/auths';


export const login = async (email, password) => {
    try {
        const {data, status} = await axios.post('user/token/', {
            email,
            password
        });
        console.log(status===200)
        if (status === 200){
            setUserAuth(data.access, data.refresh);
        }

        return {data, error:null};
    } catch (error) {
        return {data:null, error:error.response?.data?.details || 'Something went wrong'};        
    }
  
};


export const register = async (full_name, email, phone, password, password2) => {
    try {
        const {data} = await axios.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            password2
        });

        await login(email, password);

        return {data, error:null};

    } catch (error) {
        return {
            data:null,
            error: error.response?.data?.details || 'Something went wrong'
        }
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")

    userAuthStore.getState().setUser(null);
}


export const setUser = () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken || !refreshToken){
        return;
    };

    if(isAccessTokenExpired(accessToken)){
        const response = getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
    
}

export const setUserAuth = (accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, {
        expires: 1,
        secure: true
    });
    Cookies.set('refresh_token', refreshToken, {
        expires: 7,
        secure: true
    });

    const user = jwtDecode(accessToken);
    if (user){
        userAuthStore.getState().setUser(user)
    }

    userAuthStore.getState().setLoading(false);
}
console.log(Cookies.get('access_token'));
console.log(Cookies.get('refresh_token'));


export const getRefreshToken = async() => {
    try {
        const refresh = Cookies.get('refresh_token')
        const response = await axios.post('user/refresh/', {
            refresh
        })

        return response.data; 
    } catch (error) {
        console.log(error);
        
    }
    
}

export const isAccessTokenExpired = (accessToken) => {

    try {
        const decoded_token = jwtDecode(accessToken);

        return decoded_token.exp < Date.now() / 1000;
    
    } catch (error) {
        console.log(error);
        
    }
}