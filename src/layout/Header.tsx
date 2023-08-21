import { useUserStore } from '@/store/userStore';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { authAPI } from '@/api/authAPI';
import { removeTokens } from '@/utils/cookie';
import { BLOGRASS_GITHUB_LOGIN } from '@/constants/api';
import { useMutation } from '@tanstack/react-query';

export default function Header() {
    const { push } = useRouter();
    const isLogin = useUserStore((state) => state.isLogin);
    /**
     * zustand의 스테이트 값을 바로 사용하여 로그인/로그아웃 버튼을 노출 할 경우
     * Error: Hydration failed because the initial UI does not match what was rendered on the server.
     *
     */
    const [isLoginButton, setIsLoginButton] = useState(false);
    const updateUserStore = useUserStore((state) => state.handleLogin);
    const { userId, userName } = useUserStore((state) => state);
    const { mutate } = useMutation(authAPI.deleteLogOut, {
        onSuccess() {
            removeTokens();
            updateUserStore(false);
            push('/');
        },
        onError(error) {
            console.error(error);
        },
    });

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
        await mutate();
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
                    <Link href={BLOGRASS_GITHUB_LOGIN}>로그인</Link>
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
