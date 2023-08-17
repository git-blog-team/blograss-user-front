// import axios from '@/api/middlewares';
// import { BLOGRASS_AUTH_GET_TOKEN, BLOGRASS_AUTH_LOGUN } from '@/constants/api';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

export default function Header() {
    return (
        <StyledWrapperHeader>
            <div>logo</div>
            <div>
                <a href="https://api.blograss.com:7777/login/github">
                    <button>로그인</button>
                </a>
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
