/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from '@/api/axiosInterceptors';
import ListPageHeader from '@/components/ListPageHeader';
// import { BLOGRASS_AUTH_GET_TOKEN } from '@/constants/api';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authAPI } from '@/api/auth';

export default function Home() {
    const { query, push } = useRouter();

    useEffect(() => {
        if (!query.code) return;
        // const getGithubAuthToken = async () => {
        //     return await axios.get(`${BLOGRASS_AUTH_GET_TOKEN}${query.code}`);
        // };
        authAPI.getGithubAuthToken(query.code).then(() => {
            push('/');
        });
    }, [query.code]);

    return (
        <StyledMain>
            <ListPageHeader />
        </StyledMain>
    );
}

const StyledMain = styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 82px;
    width: 100%;
    background-color: #fff;
`;
