import { useUserStore } from '@/store/userStore';
import { RowCenterCenter, RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { authAPI } from '@/api/authAPI';
import { removeTokens } from '@/utils/cookie';
import { BLOGRASS_GITHUB_LOGIN } from '@/constants/api';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function Header() {
    const { push } = useRouter();
    const { isLogin, handleLogin, userId } = useUserStore((state) => state);
    /**
     * zustand의 스테이트 값을 바로 사용하여 로그인/로그아웃 버튼을 노출 할 경우
     * Error: Hydration failed because the initial UI does not match what was rendered on the server.
     *
     */
    const [isLoginButton, setIsLoginButton] = useState(false);
    const { mutate } = useMutation(authAPI.deleteLogOut, {
        onSuccess() {
            removeTokens();
            handleLogin(false);
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
            <StyledInnerWrapper>
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={30} height={30} />
                    <span>Blograss</span>
                </Link>
                <div>
                    {isLoginButton ? (
                        <>
                            <StyledUserName>{userId}님</StyledUserName>
                            <Button onClick={onClickLogOut}>로그아웃</Button>
                        </>
                    ) : (
                        <Link href={BLOGRASS_GITHUB_LOGIN}>
                            <Button>로그인</Button>
                        </Link>
                    )}
                </div>
            </StyledInnerWrapper>
        </StyledWrapperHeader>
    );
}

const StyledWrapperHeader = styled.header`
    ${RowCenterCenter}
    width: 100%;
    height: 62px;
    background-color: ${theme.colors.white};
    box-shadow: 0px 2px 4px 0px #dadfef;
    position: fixed;
    top: 0;
`;

const StyledInnerWrapper = styled.div`
    ${RowSpaceBetweenCenter}
    width: 100%;
    max-width: 1400px;
    > a {
        ${RowSpaceBetweenCenter}

        > img {
            margin-right: 4px;
        }

        > span {
            color: ${theme.colors.point_yellow_green2};
            font-size: 3rem;
            font-weight: 700;
        }
    }
`;

const StyledUserName = styled.span`
    font-size: 1rem;
    color: ${theme.colors.black};
    margin-right: 4px;
`;
