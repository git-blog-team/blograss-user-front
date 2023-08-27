import { FormEvent, RefObject } from 'react';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { IPostDetailProps } from '@/types/postType';
const PostEditor = dynamic(() => import('@/components/newpost/PostEditor'), {
    ssr: false,
});

interface Props {
    onSubmit: (e: FormEvent) => void;
    setTitle: (title: string) => void;
    editorRef: RefObject<Editor>;
    data?: IPostDetailProps;
}

export default function EditorPage({
    onSubmit,
    setTitle,
    editorRef,
    data,
}: Props) {
    return (
        <section>
            <form onSubmit={onSubmit}>
                <button type="submit">등록</button>
                <label htmlFor="title">타이틀</label>
                <input
                    type="text"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={data?.title}
                    required
                />
                <PostEditor
                    editorRef={editorRef}
                    initialValue={data?.content}
                />
            </form>
        </section>
    );
}
