import { postAPI } from '@/api/postAPI';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
const PostEditor = dynamic(() => import('@/components/newpost/PostEditor'), {
    ssr: false,
});

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
        const content = editorRef.current?.getInstance().getMarkdown();

        if (content !== undefined) mutate({ title, content });
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
