import { postAPI } from '@/api/postAPI';
import { useUserStore } from '@/store/userStore';
import { IPostDetailProps } from '@/types/postType';
import { parseTokens } from '@/utils/parserToken';
import { useMutation } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function PostDetail({ data }: { data: IPostDetailProps }) {
    const { push } = useRouter();
    const { mutate } = useMutation(postAPI.deletePost, {
        onSuccess: () => {
            push('/');
        },
    });

    const loginUser = useUserStore((state) => state.userId);
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            {loginUser === data.user.userId && <button>수정</button>}
            {loginUser === data.user.userId && (
                <button onClick={() => mutate(data.postId)}>삭제</button>
            )}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query: { postId },
    req,
}) => {
    if (req.headers.cookie === undefined) return { props: {} };
    const token = parseTokens(req.headers.cookie);
    const { data } = await postAPI.getPostDetailServer({ postId, ...token });

    return {
        props: {
            data: data.result[0],
        },
    };
};
