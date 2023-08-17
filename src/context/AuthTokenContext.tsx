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

    return <>{children}</>;
}
