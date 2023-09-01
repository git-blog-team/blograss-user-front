import { BLOGRASS_COMMENT } from '@/constants/api';
import axios from './axiosInterceptors';
import {
    CommentListData,
    EditComment,
    PostNewComment,
} from '@/types/commentType';
import qs from 'query-string';
import { AxiosResponse } from 'axios';

export const commentAPI = {
    getCommentList: async (
        params: Record<string, any>,
    ): Promise<CommentListData> => {
        const { data }: AxiosResponse = await axios.get(
            `${BLOGRASS_COMMENT}?${qs.stringify(
                params as Record<string, number>,
            )}`,
        );
        return data;
    },
    postNewComment: async ({ post, content }: PostNewComment) => {
        return await axios.post(BLOGRASS_COMMENT, {
            post,
            content,
        });
    },
    deleteComment: async ({ commentId }: { commentId: string }) => {
        return await axios.delete(BLOGRASS_COMMENT, {
            data: { commentId },
        });
    },
    editComment: async ({ commentId, content }: EditComment) => {
        return await axios.put(BLOGRASS_COMMENT, {
            commentId,
            content,
        });
    },
};
