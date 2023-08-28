import ListPageHeader from '@/components/home/ListPageHeader';
import styled from '@emotion/styled';
import PostList from '@/components/home/PostList';
import { GetServerSideProps } from 'next';
import { authAPI } from '@/api/authAPI';

export default function Home() {
    return (
        <>
            <StyledSection>
                <ListPageHeader />
                <PostList />
            </StyledSection>
        </>
    );
}

const StyledSection = styled.section`
    background-color: #fff;
    width: 100%;
    max-width: 1400px;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookieOption = `Secure ; Max-Age=${60 * 60 * 24 * 180}`;
    if (context.query.code) {
        const response = await authAPI.getAuthToken(context.query.code);
        context.res.setHeader('set-Cookie', [
            `accessToken=${response.data.result[0].accessToken}; ${cookieOption}`,
            `refreshToken=${response.data.result[0].refreshToken}; ${cookieOption}`,
        ]);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            props: {},
        };
    }
    return {
        props: {},
    };
};
