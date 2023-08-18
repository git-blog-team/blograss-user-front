// import axios from '@/api/middlewares';
// import { BLOGRASS_GET_USER_DATA } from '@/constants/api';
import { ACCESS_TOKEN } from '@/constants/common';
import { useUserStore } from '@/store/userStore';
import Cookies from 'js-cookie';
// import { useEffect } from 'react';

export default function AuthTokenContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAccessToken = !!Cookies.get(ACCESS_TOKEN);
    // const isRefreshToken = !!Cookies.get(REFRESH_TOKEN);

    const updateUserStore = useUserStore((state) => state.handleLogin);

    if (isAccessToken) {
        updateUserStore(true);
    }
    /**
     * ACCESS_TOKEN 만료되어 없고, REFRESH_TOKEN 만 있는 경우
     * 토큰 재발급 진행
     */

    /**
     * ACCESS_TOKEN, REFRESH_TOKEN 둘다 없는 경우 아무것도 하지 않음
     */

    return <>{children}</>;
}
