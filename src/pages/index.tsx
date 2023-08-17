import axios from '@/api/middlewares';
import ListPageHeader from '@/components/ListPageHeader';
import { BLOGRASS_AUTH_GET_TOKEN } from '@/constants/api';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const { query } = useRouter();

    const getGithubAuthToken = async () => {
        return await axios.get(`${BLOGRASS_AUTH_GET_TOKEN}${query.code}`);
    };

    useEffect(() => {
        if (!query.code) return;
        const response = getGithubAuthToken();
        console.log(response);
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
