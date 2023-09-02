import { postAPI } from '@/api/postAPI';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { FormEvent, RefObject, useRef, useState } from 'react';
import EditorPage from '@/components/common/EditorPage';
import { getContentFromRef } from '@/utils/getContentFromRef';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const { push } = useRouter();
    const { mutate } = useMutation(postAPI.postNew, {
        onSuccess: ({ data: { result } }) => {
            push(`/post/${result}`);
        },
    });
    const editorRef: RefObject<Editor> = useRef(null);

    const onSubmitNewPost = (e: FormEvent) => {
        e.preventDefault();
        const { markDownContent, imgArray } = getContentFromRef(editorRef);
        if (markDownContent !== undefined)
            mutate({ title, content: markDownContent, images: imgArray });
    };
    return (
        <EditorPage
            onSubmit={onSubmitNewPost}
            setTitle={setTitle}
            editorRef={editorRef}
        />
    );
}
