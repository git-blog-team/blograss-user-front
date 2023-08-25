import {
    BLOGRASS_IMAGE_BUCKET_URL,
    BLOGRASS_IMAGE_UPLOAD,
} from '@/constants/api';
import axios from './axiosInterceptors';
import { HookCallback } from '@toast-ui/editor/types/editor';

export const imageAPI = {
    postUploadImage: async (image: File | Blob, callback: HookCallback) => {
        const imageFile = new FormData();

        const file = new File([image], image.name);

        // imageFile.append

        imageFile.append('image', file);

        /**
         * 이미지 정보가 있으나
         * FormData 정보가 생성이 안됨
         */
        console.log('file', file);
        console.log('imageFile', imageFile);

        await axios
            .post(BLOGRASS_IMAGE_UPLOAD, {
                imageFile,
            })
            .then((res) => {
                console.log(res);
                const result = `${BLOGRASS_IMAGE_BUCKET_URL}/${res.data.result[0]}`;
                callback(result, 'alt_text');
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
