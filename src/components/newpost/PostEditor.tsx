import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { RefObject } from 'react';

export default function PostEditor({
    editorRef,
}: {
    editorRef: RefObject<Editor>;
}) {
    const imgUpload = async (file: File, callback: HookCallback) => {
        const formData = new FormData();
        formData.append('file', file);
        await axios({
            method: 'post',
            url: 'https://api.blograss.com/image',
            data: formData,
        })
            .then((res: any) => {
                const result = `https://blograss-bucket.s3.ap-northeast-2.amazonaws.com/images/${res.result[0]}`;
                callback(result, 'alt_text');
            })
            .catch((error) => {
                dispatch(
                    showToast({
                        toastMessage: error,
                        color: 'red',
                    }),
                );
            });
    };

    return (
        <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="800px"
            initialEditType="markdown"
            placeholder="Wirte Something"
            hideModeSwitch={true}
            language="ko-KR"
        />
    );
}
