import { postAPI } from '@/api/postAPI';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
const PostEditor = dynamic(() => import('@/components/newpost/PostEditor'), {
    ssr: false,
});
import { parse } from 'node-html-parser';
import { ImgesArrayItem } from '@/types/postType';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const { push } = useRouter();
    const { mutate } = useMutation(postAPI.postNew, {
        onSuccess: ({ data: { result } }) => {
            push(`/post/${result}`);
        },
    });
    const editorRef = useRef<Editor>(null);

    const onSubmitNewPost = (e: FormEvent) => {
        e.preventDefault();
        const markDownContent = editorRef.current?.getInstance().getMarkdown();
        const htmlContent = editorRef.current?.getInstance().getHTML();
        const imgArray: Array<ImgesArrayItem> = [];
        if (htmlContent) {
            const imgHtml = parse(htmlContent).getElementsByTagName('img');
            imgHtml.forEach((img) => {
                const regex =
                    /https:\/\/blograss-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/images\/(.+)/;
                const imgParse = img.getAttribute('src')?.match(regex);
                if (imgParse && imgParse[1])
                    imgArray.push({ url: imgParse[1] });
            });
        }

        if (markDownContent !== undefined)
            mutate({ title, content: markDownContent, images: imgArray });
    };
    return (
        <section>
            <form onSubmit={onSubmitNewPost}>
                <button type="submit">등록</button>
                <label htmlFor="title">타이틀</label>
                <input
                    type="text"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <PostEditor editorRef={editorRef} />
            </form>
        </section>
    );
}
