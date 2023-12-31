import {
    BLOGRASS_API_BASE_URL,
    BLOGRASS_CREATE_NEW_POST,
    BLOGRASS_DEL_POST,
    BLOGRASS_GET_POST_DETAIL,
    BLOGRASS_GET_POST_LIST,
    BLOGRASS_GET_USER_POST_LIST,
    BLOGRASS_PUT_POST,
} from '@/constants/api';
import axios from './axiosInterceptors';
import Axios, { AxiosResponse } from 'axios';
import {
    PostDetailParams,
    PostItem,
    PostNew,
    PostUpdate,
} from '@/types/postType';

export const postAPI = {
    postNew: async ({ title, content, images }: PostNew) => {
        return await axios.post(BLOGRASS_CREATE_NEW_POST, {
            title,
            content,
            images: images,
        });
    },
    getPostDetailServer: async ({ urlSlug, postUserId }: PostDetailParams) => {
        return await Axios.get(
            `${BLOGRASS_API_BASE_URL}${BLOGRASS_GET_POST_DETAIL}${urlSlug}&userId=${postUserId}`,
        );
    },
    getPostList: (params: string) => async () => {
        const { data }: AxiosResponse = await axios.get(
            `${BLOGRASS_GET_POST_LIST}${params}`,
        );
        return data;
    },
    getUserPostList: (params: string) => async () => {
        const { data }: AxiosResponse = await axios.get(
            `${BLOGRASS_GET_USER_POST_LIST}${params}`,
        );
        return data;
    },
    getPostDetail: async ({
        postId,
    }: {
        postId: string;
    }): Promise<PostItem> => {
        const { data }: AxiosResponse = await axios.get(
            `${BLOGRASS_API_BASE_URL}${BLOGRASS_GET_POST_DETAIL}${postId}`,
        );
        return data.result[0];
    },
    deletePost: async (postId: string) => {
        return await axios.delete(`${BLOGRASS_DEL_POST}`, {
            data: {
                postId,
            },
        });
    },
    putPostDetail: async ({
        urlSlug,
        title,
        content,
        images,
        directory,
    }: PostUpdate) => {
        return await axios.put(BLOGRASS_PUT_POST, {
            urlSlug,
            title,
            content,
            images: images,
            directory,
        });
    },
};
