import { postAPI } from '@/api/postAPI';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { FormEvent, RefObject, useRef, useState } from 'react';
import EditorPage from '@/components/common/EditorPage';
import { getContentFromRef } from '@/utils/getContentFromRef';
import { GetServerSideProps } from 'next';
import { BLOGRASS_BASE_URL } from '@/constants/api';
import { useUserStore } from '@/store';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const { userId } = useUserStore();
    const { push } = useRouter();
    const { mutate } = useMutation(postAPI.postNew, {
        onSuccess: ({ data: { result } }) => {
            push({
                pathname: `${BLOGRASS_BASE_URL}/post/${result}`,
                query: {
                    postUserId: userId,
                },
            });
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = context.req.headers.cookie;

    if (!cookies) {
        /**
         * 일단은 쿠키 여부로 권한 분기 처리,
         * 추후 로그인 페이지등으로 이동시켜서 로그인하도록 유도처리
         */
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};
