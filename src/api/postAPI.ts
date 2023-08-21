import {
    BLOGRASS_BASE_URL,
    BLOGRASS_CREATE_NEW_POST,
    BLOGRASS_GET_POST_DETAIL,
} from '@/constants/api';
import axios from './axiosInterceptors';
import Axios from 'axios';
import { PostDetailParams, PostNew } from '@/types/postType';

export const postAPI = {
    postNew: async ({ title, content }: PostNew) => {
        return await axios.post(BLOGRASS_CREATE_NEW_POST, {
            title,
            content,
            images: [],
        });
    },
    getPostDetail: async ({
        postId,
        accessToken,
        refreshToken,
    }: PostDetailParams) => {
        return await Axios.get(
            `${BLOGRASS_BASE_URL}${BLOGRASS_GET_POST_DETAIL}${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    RAuthorization: `Bearer ${refreshToken}`,
                },
            },
        );
    },
};
