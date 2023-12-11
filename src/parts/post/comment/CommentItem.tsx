import { commentAPI } from '@/api/commentAPI';
import { DEBOUNCE_OPTION, DEBOUNCE_TIME } from '@/constants/common';
import { useEnter } from '@/hooks/commons';
import { useUserStore } from '@/store';

import {
    ColumnFlexStartFlexStart,
    RowSpaceBetweenCenter,
} from '@/styles/flexModules';
import { CommentData, CommentListData } from '@/types/commentType';
import styled from '@emotion/styled';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    useMutation,
} from '@tanstack/react-query';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CommentItem(props: {
    data: CommentData;
    refetchComment: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<CommentListData, Error>>;
}) {
    const { data, refetchComment } = props;
    const { content, user, commentId } = data;
    const { userId } = useUserStore();
    const [isEdit, setIsEdit] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    const { mutate: deleteComment } = useMutation(commentAPI.deleteComment, {
        onSuccess: async () => {
            await refetchComment();
            alert('삭제되었습니다.');
        },
    });
    const { mutate: editComment } = useMutation(commentAPI.editComment, {
        onSuccess: async () => {
            await refetchComment();
            alert('댓글이 수정되었습니다.');
        },
    });

    const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentContent(e.target.value);
    };

    const handleIsEdit = async () => {
        try {
            let isConfirm = true;
            if (isEdit && content !== commentContent) {
                isConfirm = await confirm(
                    '수정중인 댓글이 있지만 취소하시겠습니까?',
                );
            }
            if (!isConfirm) return;

            setIsEdit((prev) => !prev);
            setCommentContent(content);
        } catch (e: Error | unknown) {
            console.log(e);
        }
    };

    const handleDeleteComment = async () => {
        try {
            const isConfirmDelete = await confirm('댓글을 삭제하시겠습니까?');

            if (!isConfirmDelete) return;
            await deleteComment({ commentId });
        } catch (e: Error | unknown) {
            console.log(e);
        }
    };

    const handleEditComment = _.debounce(
        async () => {
            try {
                await editComment({ commentId, content: commentContent });
            } catch (e: Error | unknown) {
                console.log(e);
            } finally {
                setIsEdit(false);
            }
        },
        DEBOUNCE_TIME,
        DEBOUNCE_OPTION,
    );

    const handleEnterKey = useEnter(handleEditComment);

    useEffect(() => {
        setCommentContent(content);
    }, [data]);

    return (
        <StyledCommentItem>
            <div>
                <div>
                    <span>{user.userName}</span>
                    {userId === user.userId ? (
                        <div>
                            <button onClick={handleIsEdit}>
                                {isEdit ? '취소' : '수정'}
                            </button>
                            <button
                                onClick={
                                    isEdit
                                        ? handleEditComment
                                        : handleDeleteComment
                                }
                            >
                                {isEdit ? '완료' : '삭제'}
                            </button>
                        </div>
                    ) : null}
                </div>
                <input
                    readOnly={!isEdit}
                    value={commentContent}
                    onChange={handleComment}
                    onKeyDown={handleEnterKey}
                />
            </div>
        </StyledCommentItem>
    );
}
const StyledCommentItem = styled.div`
    padding: 0 25px;
    background-color: #fff;
    margin: 1rem 0 0 0;

    > h2 {
        font-size: 1.3rem;
    }
    > div {
        ${ColumnFlexStartFlexStart};
        margin: 1rem;

        > div {
            ${RowSpaceBetweenCenter};
            width: 100%;
            margin: 0 0 0.5rem 0;
            > div > button {
                width: 40px;
                :last-of-type {
                    margin: 0 0 0 0.2rem;
                }
            }
            > span {
                font-size: 1.3rem;
            }
        }
        > input {
            width: 100%;
            height: 2rem;
            margin: 0 1rem 0 0;
            padding: 0 1rem;
            font-size: 1.2rem;
            margin: 1rem 0 0 0;
            :read-only {
                border: unset;
                outline: none;
            }
        }
    }
`;
