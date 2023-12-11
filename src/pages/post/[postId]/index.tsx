import { postAPI } from '@/api/postAPI';
import AnotherPost from '@/components/common/AnotherPost';
import Button from '@/components/common/Button';
import Comment from '@/parts/post/comment/Comment';
import { useUserStore } from '@/store';

import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import { IPostDetailProps } from '@/types/postType';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'timeago.js';

const EditorViewer = dynamic(() => import('@/components/post/EditorViewer'), {
    ssr: false,
});

export default function PostDetail({ data }: { data: IPostDetailProps }) {
    const USER_STORE = useUserStore();
    const { userId: loginUser } = USER_STORE;
    const { replace } = useRouter();
    const { currentPost: currentPostData, nextPost, prevPost } = data;
    const { mutate } = useMutation(postAPI.deletePost, {
        onSuccess: () => {
            replace('/');
        },
    });
    const onClickEdit = () => {
        replace({
            pathname: `/editpost/${currentPostData.urlSlug}`,
            query: {
                postUserId: currentPostData.user?.userId,
            },
        });
    };
    return (
        <section>
            <StyledWrapperViewer>
                <h1>{currentPostData.title}</h1>
                <StyledWrapperSubData>
                    <span>
                        by <b>{currentPostData.user?.userId}</b>
                        {format(currentPostData.createdAt ?? '')}
                    </span>
                    <div>
                        {loginUser === currentPostData.user?.userId && (
                            <Button onClick={onClickEdit}>수정</Button>
                        )}
                        {loginUser === currentPostData.user?.userId && (
                            <Button
                                onClick={() => mutate(currentPostData.postId)}
                            >
                                삭제
                            </Button>
                        )}
                    </div>
                </StyledWrapperSubData>
                <EditorViewer initialValue={currentPostData.content} />
                <AnotherPost nextPost={nextPost} prevPost={prevPost} />
            </StyledWrapperViewer>
            <Comment postId={currentPostData.postId} />
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query: { postId, postUserId },
}) => {
    const { data } = await postAPI.getPostDetailServer({
        urlSlug: postId,
        postUserId,
    });

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
    ${RowSpaceBetweenCenter};
`;
