import ListPageHeader from '@/components/home/ListPageHeader';
import styled from '@emotion/styled';
import PostList from '@/components/home/PostList';
import Axios from 'axios';
import {
    BLOGRASS_API_BASE_URL,
    BLOGRASS_AUTH_GET_TOKEN,
} from '@/constants/api';
import { GetServerSideProps } from 'next';

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
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookieOption = `Secure ; Max-Age=${60 * 60 * 24 * 180}`;
    if (context.query.code) {
        const response = await Axios.get(
            `${BLOGRASS_API_BASE_URL}${BLOGRASS_AUTH_GET_TOKEN}${context.query.code}`,
        );
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
