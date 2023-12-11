import { commentAPI } from '@/api/commentAPI';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import styled from '@emotion/styled';
import { useQuery, useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import { CommentListData } from '@/types/commentType';
import { useEnter } from '@/hooks/commons';
import { DEBOUNCE_OPTION, DEBOUNCE_TIME } from '@/constants/common';

export default function Comment({ postId }: { postId: string }) {
    const [commentContent, setCommentContent] = useState('');

    const { data, refetch } = useQuery<CommentListData, Error>(
        ['commentData', postId],

        () =>
            commentAPI.getCommentList({
                postId: postId,
                page: 1,
                limit: 10,
                sortField: 'createdAt',
                sortOrder: 'DESC',
            }),
        {
            enabled: false,
        },
    );

    const { mutate: postComment } = useMutation(commentAPI.postNewComment, {
        onSuccess: () => {
            refetch();
            setCommentContent('');
        },
    });

    const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentContent(e.target.value);
    };
    const handleSubmitComment = _.debounce(
        async () => {
            if (!commentContent) return;
            await postComment({ post: { postId }, content: commentContent });
        },
        DEBOUNCE_TIME,
        DEBOUNCE_OPTION,
    );
    const commentData = data?.result?.[0].content;

    const handleEnterKey = useEnter(handleSubmitComment);

    useEffect(() => {
        if (!data && postId) {
            refetch();
        }
    }, []);

    return (
        <StyledCommentWrapper>
            <StyledWrapperViewer>
                <h2>댓글 {data?.result?.[0].totalElements}</h2>
                <div>
                    <input
                        value={commentContent}
                        onChange={handleComment}
                        onKeyDown={handleEnterKey}
                    />
                    <button
                        onClick={handleSubmitComment}
                        disabled={!commentContent}
                    >
                        등록
                    </button>
                </div>
            </StyledWrapperViewer>
            {_.map(commentData, (item) => (
                <CommentItem
                    key={item.commentId}
                    refetchComment={refetch}
                    data={item}
                />
            ))}
        </StyledCommentWrapper>
    );
}
const StyledCommentWrapper = styled.section`
    > div {
        padding: 25px;
        background-color: #fff;
        margin: 1rem 0 0 0;
    }
    margin: 0 0 10rem 0;
`;
const StyledWrapperViewer = styled.div`
    > h2 {
        font-size: 1.3rem;
    }
    > div {
        ${RowSpaceBetweenCenter};
        margin: 1rem;
        height: 2rem;
        > input {
            width: 85%;
            height: 100%;
            margin: 0 1rem 0 0;
            padding: 0 1rem;
        }
        > button {
            width: 15%;
            height: 100%;
            min-width: 40px;
        }
    }
`;
