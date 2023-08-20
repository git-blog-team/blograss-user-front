import ListPageHeader from '@/components/ListPageHeader';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import { authAPI } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';

export default function Home({
    query,
}: {
    query: {
        code?: string;
    };
}) {
    const { push } = useRouter();
    const { isLoading, error } = useQuery({
        queryKey: ['getAuthToken'],
        queryFn: async () => {
            const data = await authAPI.getAuthToken(query.code).finally(() => {
                push('/');
            });
            return data;
        },
        enabled: !!query.code,
    });

    if (error) {
        console.error(error);
    }

    // console.log(isLoading, data, error, !!query.code);

    // useEffect(() => {
    //     if (!query.code) return;
    //     authAPI.getAuthToken(query.code).then(() => {
    //         push('/');
    //     });
    // }, [query.code]);

    return (
        <>
            {isLoading ? (
                <h1> 로딩중...</h1>
            ) : (
                <StyledSection>
                    <ListPageHeader />
                </StyledSection>
            )}
        </>
    );
}

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 82px;
    width: 100%;
    background-color: #fff;
`;

export const getServerSideProps = async ({
    query,
}: {
    query: {
        code?: string;
    };
}) => {
    return {
        props: {
            query,
        },
    };
};
