import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { imageAPI } from '@/api/imageAPI';
import * as DOMPurify from 'dompurify';
import { IPropsPostEditor } from '@/types/postType';

export default function PostEditor({
    editorRef,
    initialValue,
}: IPropsPostEditor) {
    const customSanitizer = DOMPurify.sanitize;

    return (
        <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="800px"
            initialEditType="markdown"
            placeholder="Write Something"
            hideModeSwitch={true}
            language="ko-KR"
            hooks={{
                addImageBlobHook: imageAPI.postUploadImage,
            }}
            customHTMLSanitizer={customSanitizer}
            initialValue={initialValue}
        />
    );
}
