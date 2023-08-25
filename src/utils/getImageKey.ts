import { ImgesArrayItem } from '@/types/postType';
import parse from 'node-html-parser';

export const getImageKey = (htmlElement: string | undefined) => {
    if (!htmlElement) return [];

    const imgHtml = parse(htmlElement).getElementsByTagName('img');
    const imgKey: Array<ImgesArrayItem> = [];
    imgHtml.forEach((img) => {
        const regex =
            /https:\/\/blograss-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/images\/(.+)/;
        const imgParse = img.getAttribute('src')?.match(regex);
        if (imgParse && imgParse[1]) imgKey.push({ url: imgParse[1] });
    });

    return imgKey;
};
