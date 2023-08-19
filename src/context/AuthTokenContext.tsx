// import axios from '@/api/middlewares';
// import { BLOGRASS_TOKEN_REPUBLISH } from '@/constants/api';
// import { BLOGRASS_GET_USER_DATA } from '@/constants/api';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
// import { useUserStore } from '@/store/userStore';
// // import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useEffect } from 'react';
// import { useEffect } from 'react';

export default function AuthTokenContext({
    children,
}: {
    children: React.ReactNode;
}) {
    // const isAccessToken = Cookies.get(ACCESS_TOKEN);
    // const isRefreshToken = Cookies.get(REFRESH_TOKEN);

    // console.log(isAccessToken, isRefreshToken);

    // const updateUserStore = useUserStore((state) => state.handleLogin);
    // const isLogin = useUserStore((state) => state.isLogin);

    // /**
    //  * ACCESS_TOKEN이 있는 경우 로그인 상태로 변경
    //  */

    // // if (isAccessToken) {
    // //     updateUserStore(true);
    // // }
    // /**
    //  * ACCESS_TOKEN 만료되어 없고, REFRESH_TOKEN 만 있는 경우
    //  * 토큰 재발급 진행
    //  */

    // const getTokenRepublish = async () => {
    //     await axios.post(BLOGRASS_TOKEN_REPUBLISH).then(() => {
    //         updateUserStore(true);
    //     });
    // };

    // if (isAccessToken && isRefreshToken) {
    //     // axios.post(BLOGRASS_TOKEN_REPUBLISH);
    //     getTokenRepublish();
    // }

    // useEffect(() => {
    //     if (!isLogin && isAccessToken && isRefreshToken) {
    //         getTokenRepublish();
    //     }
    // }, [isLogin]);

    // const myHeaders = new Headers();
    // myHeaders.append('RAuthorization', isRefreshToken || undefined);
    // myHeaders.append('Authorization', `Bearer ${isAccessToken}`);

    // const requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    // };

    // fetch('https://api.blograss.com:7777/auth/tokenrepubilsh', requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log('error', error));

    /**
     * ACCESS_TOKEN, REFRESH_TOKEN 둘다 없는 경우 아무것도 하지 않음
     */

    return <>{children}</>;
}
