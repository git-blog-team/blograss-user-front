import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import Axios from 'axios';
import Cookies from 'js-cookie';

const axios = Axios.create({
    baseURL: 'https://api.blograss.com:7777',
    timeout: 10000,
});

axios.interceptors.request.use(
    // request시 사용될것들
    // 첫번째인자 : request 진행시, 두번째인자 : request 실패시

    (conf) => {
        conf.headers = conf.headers ?? {};
        const accessToken = Cookies.get(ACCESS_TOKEN);
        const refreshToken = Cookies.get(REFRESH_TOKEN);

        if (accessToken !== undefined) {
            conf.headers.Authorization = `Bearer ${accessToken}`;
            // 토큰값이 있으면 헤더 Authorization에 넣어줌
        }
        if (refreshToken !== undefined) {
            conf.headers.RAuthorization = `${refreshToken}`;
        }
        return conf;
    },

    async (error) => {
        // 요청실패시`
        console.log('요청실패');
        await Promise.reject(error);
    },
);

axios.interceptors.response.use(
    // response 시 사용될것들
    // 첫번째인자 : response 진행시, 두번째인자 : response 실패시
    (res) => {
        if (res.request.responseURL === 'https://api.blograss.com:7777/auth') {
            // accessToken 28800 8시간 프론트에서는 6개월로 설정
            // refreshToken 15811200 6개월

            Cookies.set(ACCESS_TOKEN, res.data.result[0].accessToken, {
                expires: 180,
                secure: true,
            });
            Cookies.set(REFRESH_TOKEN, res.data.result[0].refreshToken, {
                expires: 180,
                secure: true,
            });
        }
        return res.data;
    },
    async (error) => {
        // 토큰만료관련 작성될 로직 여기
        console.log('응답실패');
        console.log(error.response.status);
        await Promise.reject(error);
    },
);

export default axios;
