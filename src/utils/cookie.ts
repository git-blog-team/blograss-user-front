import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import { Token } from '@/types/commonType';
import Cookies from 'js-cookie';

export const setTokens = ({ accessToken, refreshToken }: Token) => {
    Cookies.set(ACCESS_TOKEN, accessToken, {
        expires: 180,
        secure: true,
    });

    Cookies.set(REFRESH_TOKEN, refreshToken, {
        expires: 180,
        secure: true,
    });
};

export const getTokens = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    const refreshToken = Cookies.get(REFRESH_TOKEN);

    return { accessToken, refreshToken };
};

export const removeTokens = () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
};
