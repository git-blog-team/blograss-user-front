import styled from '@emotion/styled';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Viewer } from '@toast-ui/react-editor';
import * as DOMPurify from 'dompurify';

export default function EditorViewer({
    initialValue,
}: {
    initialValue: string;
}) {
    const customSanitizer = DOMPurify.sanitize;

    return (
        <WrapperViewer>
            <Viewer
                initialValue={initialValue}
                customHTMLSanitizer={customSanitizer}
            />
        </WrapperViewer>
    );
}

const WrapperViewer = styled.article`
    width: 100%;
    padding: 20px 40px;
    img {
        width: 100%;
        object-fit: cover;
    }
`;
