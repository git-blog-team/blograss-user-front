import ListPageHeader from '@/components/home/ListPageHeader';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { authAPI } from '@/api/authAPI';
import { useQuery } from '@tanstack/react-query';
import GridLoader from '@/components/common/GridLoader';
import theme from '@/styles/theme';
import { ColumnCenterCenter } from '@/styles/flexModules';
import PostList from '@/components/home/PostList';

interface IProps {
    query: {
        code?: string;
    };
}

export default function Home({ query }: IProps) {
    const { push } = useRouter();
    const { isFetching, error } = useQuery({
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

    return (
        <>
            {isFetching ? (
                <StyledWrapperLoader>
                    <GridLoader
                        size={100}
                        color={theme.colors.point_green}
                        speedMultiplier={0.8}
                    />
                </StyledWrapperLoader>
            ) : (
                <StyledSection>
                    <ListPageHeader />
                    <PostList />
                </StyledSection>
            )}
        </>
    );
}

const StyledWrapperLoader = styled.section`
    ${ColumnCenterCenter}
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
`;

export const getServerSideProps = async ({ query }: IProps) => {
    return {
        props: {
            query,
        },
    };
};
