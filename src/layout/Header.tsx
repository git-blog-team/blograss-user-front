import {
    ColumnCenterCenter,
    RowCenterCenter,
    RowFlexStartCenter,
    RowSpaceBetweenCenter,
} from '@/styles/flexModules';
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
import { useUserStore } from '@/store';

export default function Header() {
    const { push } = useRouter();
    const { isLogin, handleLogin, userId } = useUserStore();
    const [isUseBoxOpen, setIsUserBoxOpen] = useState(false);
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

    const handleUserBoxOpen = () => {
        setIsUserBoxOpen((prev) => !prev);
    };

    useEffect(() => {
        isLogin ? setIsLoginButton(true) : setIsLoginButton(false);
    }, [isLogin]);

    return (
        <StyledWrapperHeader>
            <StyledInnerWrapper>
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={30} height={30} />
                    <span>Blograss</span>
                </Link>
                <div>
                    {isLoginButton ? (
                        <StyledUserBox
                            onClick={handleUserBoxOpen}
                            isOpen={isUseBoxOpen}
                        >
                            <p>{userId}님</p>
                            <img src="" />
                            {/* TODO : 유저프로필사진 연동 */}
                            <ul>
                                <Link href="/">내 포스트</Link>
                                {/* TODO : 내포스트 경로 연결 */}
                                <Link href="/user-setting">설정</Link>
                                <button onClick={() => mutate()}>
                                    로그아웃
                                </button>
                            </ul>
                        </StyledUserBox>
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
    height: 6rem;
    padding: 0 2rem;
    background-color: ${theme.colors.white};
    box-shadow: 0px 2px 4px 0px #dadfef;
    position: fixed;
    top: 0;
    z-index: 10;
`;

const StyledInnerWrapper = styled.div`
    ${RowSpaceBetweenCenter}
    width: 100%;
    max-width: 140rem;

    > a {
        ${RowSpaceBetweenCenter}

        > img {
            margin-right: 1rem;
        }

        > span {
            color: ${theme.colors.point_yellow_green2};
            font-size: 3rem;
            font-weight: 700;
        }
    }
`;

const StyledUserBox = styled.div<{ isOpen: boolean }>`
    ${RowFlexStartCenter};
    position: relative;
    cursor: pointer;
    > p {
        font-size: 1.4rem;
        color: ${theme.colors.black};
        margin-right: 1.5rem;
    }
    > img {
        width: 2rem;
        height: 2rem;
        background-color: yellow;
        border: 50%;
    }
    > ul {
        ${ColumnCenterCenter};
        position: absolute;
        right: -1rem;
        top: 4rem;
        visibility: ${(props) => (props.isOpen ? 'unset' : 'hidden')};
        background-color: white;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 0 0 0.6rem 0.6rem;
        padding: 1.5rem;

        row-gap: 1rem;
        width: 15rem;
        > a,
        button {
            background-color: unset;
            width: 100%;
            font-size: 1.4rem;
            border-radius: 0.4rem;
            border: 1px solid green;
            color: green;
            line-height: 3rem;
            text-align: center;
            cursor: pointer;
        }
    }
`;
