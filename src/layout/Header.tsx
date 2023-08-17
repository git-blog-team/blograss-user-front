// import axios from '@/api/middlewares';
// import { BLOGRASS_AUTH_GET_TOKEN, BLOGRASS_AUTH_LOGUN } from '@/constants/api';
import { useUserStore } from '@/store/userStore';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
    const isLogin = useUserStore((state) => state.isLogin);
    const [isLoginButton, setIsLoginButton] = useState(false);

    useEffect(() => {
        isLogin ? setIsLoginButton(true) : setIsLoginButton(false);
    }, [isLogin]);

    return (
        <StyledWrapperHeader>
            <div>
                <Link href="/">LOGO</Link>
            </div>
            <div>
                {isLoginButton ? (
                    <button>로그아웃</button>
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
