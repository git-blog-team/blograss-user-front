import ListPageHeader from '@/components/home/ListPageHeader';
import styled from '@emotion/styled';
import PostList from '@/components/home/PostList';
import { IPropsHome } from '@/types/commonType';

export default function Home() {
    return (
        <StyledSection>
            <ListPageHeader />
            <PostList />
        </StyledSection>
    );
}

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
`;

export const getServerSideProps = async ({ query }: IPropsHome) => {
    if (query.code)
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {},
        };
    return {
        props: {},
    };
};
