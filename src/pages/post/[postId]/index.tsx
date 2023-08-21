import { postAPI } from '@/api/postAPI';
import { IPostDetailProps } from '@/types/postType';
import { parseTokens } from '@/utils/parserToken';
import { GetServerSideProps } from 'next';

export default function PostDetail({ data }: { data: IPostDetailProps }) {
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query: { postId },
    req,
}) => {
    if (req.headers.cookie === undefined) return { props: {} };
    const token = parseTokens(req.headers.cookie);
    const { data } = await postAPI.getPostDetail({ postId, ...token });

    return {
        props: {
            data: data.result[0],
        },
    };
};
