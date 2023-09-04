import { postAPI } from '@/api/postAPI';
import Button from '@/components/common/Button';
import Comment from '@/parts/post/comment/Comment';
import { useUserStore } from '@/store/userStore';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import { IPostDetailProps, PostItem } from '@/types/postType';
import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'timeago.js';

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
        <section>
            <StyledWrapperViewer>
                <h1>{data.title}</h1>
                <StyledWrapperSubData>
                    <span>
                        by <b>{data.user.userId}</b>
                        {format(data.createdAt ?? '')}
                    </span>
                    <div>
                        {loginUser === data.user.userId && (
                            <Link href={`/editpost/${data.postId}`}>
                                <Button>수정</Button>
                            </Link>
                        )}
                        {loginUser === data.user.userId && (
                            <Button onClick={() => mutate(data.postId)}>
                                삭제
                            </Button>
                        )}
                    </div>
                </StyledWrapperSubData>
                <EditorViewer initialValue={data.content} />
            </StyledWrapperViewer>
            <Comment />
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query: { postId },
}) => {
    const { data } = await postAPI.getPostDetailServer({ postId });

    return {
        props: {
            data: data.result[0],
        },
    };
};

const StyledWrapperViewer = styled.div`
    padding: 40px;
    background-color: #fff;
    > h1 {
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 10px;
    }
    > div > span {
        font-size: 1rem;
        color: #555555;
        b {
            font-weight: bold;
        }
    }
`;

const StyledWrapperSubData = styled.div`
    ${RowSpaceBetweenCenter}
`;
