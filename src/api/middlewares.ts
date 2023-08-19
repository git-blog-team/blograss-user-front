import { BLOGRASS_TOKEN_REPUBLISH } from '@/constants/api';
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
            conf.headers.RAuthorization = `Bearer ${refreshToken}`;
        }
        return conf;
    },

    async (error) => {
        // 요청실패시`
        await Promise.reject(error);
    },
);

// accessToken
// :
// "ghu_ySAdjdHaKk9PuWcZlrg7sRKrkHxQW03Nt4uk"
// refreshToken
// :
// "ghr_DOFDS8jInJ9bPkw5gGqVfYO2zdWmXUgOB2dEoka1Bm57rcw9WXoC2JXXUrELT3k9tAcoTQ35QNBo"

axios.interceptors.response.use(
    // response 시 사용될것들
    // 첫번째인자 : response 진행시, 두번째인자 : response 실패시
    (res) => {
        console.log(res);
        if (
            res.request.responseURL.includes(
                'https://api.blograss.com:7777/auth?code=',
            )
        ) {
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
        console.log('401에러', error.response.status);
        if (error.response.status === 401) {
            // 토큰만료시
            // 토큰만료시 토큰 재발급 요청
            // const accessToken = Cookies.get(ACCESS_TOKEN);
            // const refreshToken = Cookies.get(REFRESH_TOKEN);
            const res = await axios.post(BLOGRASS_TOKEN_REPUBLISH);
            console.log('토큰 재발급', res);
            // 토큰 재발급 성공시
            // if (res.status === 200) {
            //     // 토큰 재발급 성공시 쿠키에 토큰 재발급
            //     Cookies.set(ACCESS_TOKEN, res.data.result[0].accessToken, {
            //         expires: 180,
            //         secure: true,
            //     });
            //     Cookies.set(REFRESH_TOKEN, res.data.result[0].refreshToken, {
            //         expires: 180,
            //         secure: true,
            //     });
            //     // 토큰 재발급 성공시 토큰 재요청
            //     const res2 = await axios.request({
            //         url: error.config.url,
            //         method: error.config.method,
            //         data: error.config.data,
            //     });
            //     return res2.data;
            // }
        }
        // await Promise.reject(error);
    },
);

export default axios;
