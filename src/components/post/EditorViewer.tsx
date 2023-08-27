import { Viewer } from '@toast-ui/react-editor';
import * as DOMPurify from 'dompurify';

export default function EditorViewer({
    initialValue,
}: {
    initialValue: string;
}) {
    const customSanitizer = DOMPurify.sanitize;

    return (
        <Viewer
            initialValue={initialValue}
            customHTMLSanitizer={customSanitizer}
        />
    );
}
