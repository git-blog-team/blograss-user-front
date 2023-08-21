import {
    BLOGRASS_AUTH_GET_TOKEN,
    BLOGRASS_GET_USER_DATA,
    BLOGRASS_TOKEN_REPUBLISH,
    BLOGRASS_USER_LOGOUT,
} from '@/constants/api';
import axios from './axiosInterceptors';

export const authAPI = {
    getUserData: async () => {
        return await axios.get(BLOGRASS_GET_USER_DATA);
    },
    getAuthToken: async (code: string | string[] | undefined) => {
        return await axios.get(`${BLOGRASS_AUTH_GET_TOKEN}${code}`);
    },
    deleteLogOut: async () => {
        return await axios.delete(BLOGRASS_USER_LOGOUT);
    },
    postGetTokenRepublish: async () => {
        return await axios.post(BLOGRASS_TOKEN_REPUBLISH);
    },
};
