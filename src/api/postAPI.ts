import { BLOGRASS_CREATE_NEW_POST } from '@/constants/api';
import axios from './axiosInterceptors';

interface PostNew {
    title: string;
    content: string;
}

export const postAPI = {
    postNew: async ({ title, content }: PostNew) => {
        return await axios.post(BLOGRASS_CREATE_NEW_POST, {
            title,
            content,
            images: [],
        });
    },
};
