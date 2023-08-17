/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/api/middlewares';
import ListPageHeader from '@/components/ListPageHeader';
import { BLOGRASS_AUTH_GET_TOKEN } from '@/constants/api';
import styled from '@emotion/styled';

export default function Home() {
    // console.log(data);
    // const { query, push } = useRouter();

    // useEffect(() => {
    //     if (!query.code) return;

    //     const getGithubAuthToken = async () => {
    //         return await axios.get(`${BLOGRASS_AUTH_GET_TOKEN}${query.code}`);
    //     };
    //     getGithubAuthToken().then(() => {
    //         push('/');
    //     });
    // }, [query.code]);

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

// interface Props {
//     req: any;
//     query: string;
// }

// export async function getServerSideProps({ req, query }: Props) {
//     console.log('params😏', req.cookies, query);
//     // Fetch data from external API
//     // const res = await fetch(`https://.../data`)
//     // const data = await res.json()

//     // Pass data to the page via props
//     return {
//         props: {
//             data: {},
//         },
//     };
// }

interface Props {
    req: any;
    query: any;
}

export const getServerSideProps = async ({
    req: { cookies },
    query,
}: Props) => {
    console.log(cookies, query);
    if (!query.code)
        return {
            props: {
                data: {},
            },
        };
    await axios.get(`${BLOGRASS_AUTH_GET_TOKEN}${query.code}`);

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
        props: {
            data: {},
        },
    };
};
