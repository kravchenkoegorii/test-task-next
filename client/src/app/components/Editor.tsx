'use client'

import {
    Bold,
    ClassicEditor,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo,
    Link, EventInfo,
} from "ckeditor5";
import {CKEditor} from "@ckeditor/ckeditor5-react";

import 'ckeditor5/ckeditor5.css';

interface EditorFormProps {
    description: any;
    onChange: any
}

const Editor: React.FC<EditorFormProps> = ({description, onChange}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={(event: EventInfo, editor: ClassicEditor) => onChange(editor.getData())}
            config={{
                toolbar: {
                    items: ['bold', 'italic', 'link', 'insertTable', 'bulletedList', 'numberedList', 'indent', 'outdent']
                },
                plugins: [
                    Bold,
                    Essentials,
                    Heading,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Paragraph,
                    Table,
                    Undo
                ],
                initialData: description,
            }}
        />
    );
}

export default Editor;
