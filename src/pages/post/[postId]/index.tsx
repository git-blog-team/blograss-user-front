import { postAPI } from '@/api/postAPI';
// import EditorViewer from '@/components/post/EditorViewer';
import { useUserStore } from '@/store/userStore';
import { IPostDetailProps } from '@/types/postType';
import { parseTokens } from '@/utils/parserToken';
import { useMutation } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const EditorViewer = dynamic(() => import('@/components/post/EditorViewer'), {
    ssr: false,
});

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
            {loginUser === data.user.userId && <button>수정</button>}
            {loginUser === data.user.userId && (
                <button onClick={() => mutate(data.postId)}>삭제</button>
            )}
            <h1>{data.title}</h1>
            <EditorViewer initialValue={data.content} />
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
