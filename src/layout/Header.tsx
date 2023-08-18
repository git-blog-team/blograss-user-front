// import axios from '@/api/middlewares';
// import { BLOGRASS_AUTH_GET_TOKEN, BLOGRASS_AUTH_LOGUN } from '@/constants/api';
import axios from '@/api/middlewares';
import { BLOGRASS_USER_LOGOUT } from '@/constants/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import { useUserStore } from '@/store/userStore';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Header() {
    const { push } = useRouter();
    const isLogin = useUserStore((state) => state.isLogin);
    const [isLoginButton, setIsLoginButton] = useState(false);

    /**
     * zustand의 스테이트 값을 바로 사용하여 로그인/로그아웃 버튼을 노출 할 경우
     * Error: Hydration failed because the initial UI does not match what was rendered on the server.
     *
     */

    useEffect(() => {
        isLogin ? setIsLoginButton(true) : setIsLoginButton(false);
    }, [isLogin]);

    const onClickLogOut = async () => {
        const res = await axios
            .delete(BLOGRASS_USER_LOGOUT)
            .then(() => {
                Cookies.remove(ACCESS_TOKEN);
                Cookies.remove(REFRESH_TOKEN);
                push('/');
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(res);
    };

    return (
        <StyledWrapperHeader>
            <div>
                <Link href="/">LOGO</Link>
            </div>
            <div>
                {isLoginButton ? (
                    <button onClick={onClickLogOut}>로그아웃</button>
                ) : (
                    <Link href="https://api.blograss.com:7777/login/github">
                        로그인
                    </Link>
                )}
            </div>
        </StyledWrapperHeader>
    );
}

const StyledWrapperHeader = styled.header`
    ${RowSpaceBetweenCenter}
    width: 100%;
    height: 62px;
    background-color: ${theme.colors.white};
    box-shadow: 0px 2px 4px 0px #dadfef;
    position: fixed;
    top: 0;
`;
