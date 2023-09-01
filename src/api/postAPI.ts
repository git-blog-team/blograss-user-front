import {
    BLOGRASS_API_BASE_URL,
    BLOGRASS_CREATE_NEW_POST,
    BLOGRASS_DEL_POST,
    BLOGRASS_GET_POST_DETAIL,
    BLOGRASS_GET_POST_LIST,
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
    getPostDetailServer: async ({ postId }: PostDetailParams) => {
        return await Axios.get(
            `${BLOGRASS_API_BASE_URL}${BLOGRASS_GET_POST_DETAIL}${postId}`,
        );
    },
    getPostList: async () => {
        return await axios.get(
            `${BLOGRASS_GET_POST_LIST}keyword=&page=1&limit=20&sortField=createdAt&sortOrder=DESC`,
        );
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
    putPostDetail: async ({ postId, title, content, images }: PostUpdate) => {
        return await axios.put(BLOGRASS_PUT_POST, {
            postId,
            title,
            content,
            images: images,
        });
    },
};
