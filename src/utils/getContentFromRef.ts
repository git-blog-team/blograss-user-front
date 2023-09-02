import { ImgesArrayItem } from '@/types/postType';
import { Editor } from '@toast-ui/react-editor';
import { RefObject } from 'react';
import { getImageKey } from './getImageKey';

export const getContentFromRef = (ref: RefObject<Editor>) => {
    const markDownContent = ref.current?.getInstance().getMarkdown();
    const htmlContent = ref.current?.getInstance().getHTML();
    const imgArray: Array<ImgesArrayItem> = getImageKey(htmlContent);

    return {
        markDownContent,
        imgArray,
    };
};
