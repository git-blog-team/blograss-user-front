import Axios from 'axios';
import { authAPI } from './authAPI';
import { getTokens, setTokens } from '@/utils/cookie';
import { BLOGRASS_API_BASE_URL } from '@/constants/api';

const axios = Axios.create({
    baseURL: BLOGRASS_API_BASE_URL,
    timeout: 10000,
});

axios.interceptors.request.use(
    // request시 사용될것들
    // 첫번째인자 : request 진행시, 두번째인자 : request 실패시

    (conf) => {
        conf.headers = conf.headers ?? {};
        const { accessToken, refreshToken } = getTokens();

        if (accessToken !== undefined) {
            conf.headers.Authorization = `Bearer ${accessToken}`;
            // 토큰값이 있으면 헤더 Authorization에 넣어줌
        }
        if (refreshToken !== undefined) {
            conf.headers.RAuthorization = `Bearer ${refreshToken}`;
        }
        return conf;
    },

    async (error) => {
        // 요청실패시`
        await Promise.reject(error);
    },
);

axios.interceptors.response.use(
    // response 시 사용될것들
    // 첫번째인자 : response 진행시, 두번째인자 : response 실패시
    (res) => {
        if (
            res.request.responseURL.includes(
                'https://api.blograss.com:7777/auth?code=',
            ) ||
            res.request.responseURL.includes(
                'https://api.blograss.com:7777/auth/tokenrepubilsh',
            )
        ) {
            // accessToken 28800 8시간 프론트에서는 6개월로 설정
            // refreshToken 15811200 6개월
            setTokens({
                accessToken: res.data.result[0].accessToken,
                refreshToken: res.data.result[0].refreshToken,
            });
        }
        return res;
    },
    async (error) => {
        // 토큰만료관련 작성될 로직 여기
        if (error.response.status === 401) {
            // 토큰만료시 토큰 재발급 요청
            const data = await authAPI
                .postGetTokenRepublish()
                .then(() => {
                    // 토큰 재발급 성공시 먼저 실패한 api 재요청
                    return axios.request({
                        url: error.config.url,
                        method: error.config.method,
                        data: error.config.data,
                    });
                })
                .then((res) => res);

            return data;
        } else {
            await Promise.reject(error);
        }
    },
);

export default axios;
