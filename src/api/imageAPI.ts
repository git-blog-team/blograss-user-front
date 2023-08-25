import {
    BLOGRASS_IMAGE_BUCKET_URL,
    BLOGRASS_IMAGE_UPLOAD,
} from '@/constants/api';
import axios from './axiosInterceptors';
import { HookCallback } from '@toast-ui/editor/types/editor';

export const imageAPI = {
    postUploadImage: async (image: File | Blob, callback: HookCallback) => {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const result = await axios({
                method: 'post',
                url: BLOGRASS_IMAGE_UPLOAD,
                data: formData,
            });
            const imageUrl =
                await `${BLOGRASS_IMAGE_BUCKET_URL}/${result.data.result[0]}`;
            callback(imageUrl, 'alt_text');
        } catch (error) {
            console.error(error);
        }
    },
};
