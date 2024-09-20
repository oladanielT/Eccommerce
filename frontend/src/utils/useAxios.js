import { setUserAuth, getRefreshToken, isAccessTokenExpired } from "./auth";
import Cookies from 'js-cookie';
import axios from 'axios';
import { BaseUrl } from "./constants";


export const useAxios = () => {
    const access_token = Cookies.get('access_token');
    const refresh_token = Cookies.get('refresh_token');

    const axiosInstance = axios.create({
        baseURL: BaseUrl,
        headers: {Authorization: `Bearer ${access_token}`},
        withCredentials: true,
    })


    axiosInstance.interceptors.request.use(async (req) => {
        if (!isAccessTokenExpired(access_token)){
            return req;
        }

        const response = await getRefreshToken(refresh_token);
        setUserAuth(response.access, response.refresh);

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req
    });
    return axiosInstance;
}