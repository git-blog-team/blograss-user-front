// import axios from '@/api/axiosInterceptors';
// import { BLOGRASS_USER_LOGOUT } from '@/constants/api';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import { useUserStore } from '@/store/userStore';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
// import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { authAPI } from '@/api/auth';
import { removeTokens } from '@/utils/cookie';

export default function Header() {
    const { push } = useRouter();
    const isLogin = useUserStore((state) => state.isLogin);
    const [isLoginButton, setIsLoginButton] = useState(false);
    const updateUserStore = useUserStore((state) => state.handleLogin);
    const { userId, userName } = useUserStore((state) => state);

    /**
     * zustand의 스테이트 값을 바로 사용하여 로그인/로그아웃 버튼을 노출 할 경우
     * Error: Hydration failed because the initial UI does not match what was rendered on the server.
     *
     */

    useEffect(() => {
        isLogin ? setIsLoginButton(true) : setIsLoginButton(false);
    }, [isLogin]);

    /**
     * 로그아웃 버튼 클릭 시
     * 1. 서버에 로그아웃 요청
     * 2. 쿠키 삭제
     * 3. zustand 스테이트 isLogin 값 변경
     * 4. 메인 페이지로 이동
     */
    const onClickLogOut = async () => {
        await authAPI
            .deleteLogOut()
            .then(() => {
                removeTokens();
                updateUserStore(false);
                push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <StyledWrapperHeader>
            <div>
                <Link href="/">LOGO</Link>
            </div>
            <div>
                {isLoginButton ? (
                    <>
                        {userId} {userName}
                        <button onClick={onClickLogOut}>로그아웃</button>
                    </>
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
