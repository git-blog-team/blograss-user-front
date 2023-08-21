import { postAPI } from '@/api/postAPI';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { push } = useRouter();
    const { mutate } = useMutation(postAPI.postNew, {
        onSuccess: ({ data: { result } }) => {
            push(`/post/${result}`);
        },
    });

    const onSubmitNewPost = (e: FormEvent) => {
        e.preventDefault();
        mutate({ title, content });
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
                />
                <label htmlFor="content">내용</label>
                <input
                    type="text"
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                />
            </form>
        </section>
    );
}
