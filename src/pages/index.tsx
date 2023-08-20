import ListPageHeader from '@/components/ListPageHeader';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authAPI } from '@/api/auth';

export default function Home() {
    const { query, push } = useRouter();

    useEffect(() => {
        if (!query.code) return;
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
