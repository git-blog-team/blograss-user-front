import { postAPI } from '@/api/postAPI';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
const PostEditor = dynamic(() => import('@/components/newpost/PostEditor'), {
    ssr: false,
});
// import { parse } from 'node-html-parser';
import { ImgesArrayItem } from '@/types/postType';
import { getImageKey } from '@/utils/getImageKey';

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
        const imgArray: Array<ImgesArrayItem> = getImageKey(htmlContent);
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
