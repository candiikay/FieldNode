import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "Start typing...", 
  className = "",
  error = false 
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `rich-text-editor ${className} ${error ? 'error' : ''}`,
      },
    },
  });

  const getWordCount = useCallback(() => {
    if (!editor) return 0;
    const text = editor.getText();
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, [editor]);

  return (
    <div className="rich-text-wrapper">
      <EditorContent editor={editor} />
      <div className="editor-footer">
        <span className="word-count">{getWordCount()} words</span>
        <span className="word-limit">/ 1000 max</span>
      </div>
      
      <style jsx>{`
        .rich-text-wrapper {
          position: relative;
          width: 100%;
        }

        .rich-text-editor {
          width: 100% !important;
          min-height: 120px;
          background: #121214;
          border: 2px solid rgba(185,137,255,0.25);
          border-radius: 12px;
          color: #F5EDEE;
          padding: 20px 24px;
          font-size: 15px;
          line-height: 1.7;
          font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          transition: all 0.2s ease;
          box-sizing: border-box;
          display: block;
          margin: 0;
          max-width: none;
          outline: none;
        }

        .rich-text-editor:focus {
          border-color: #B989FF;
          box-shadow: 0 0 0 4px rgba(185,137,255,0.15);
          background: #141217;
        }

        .rich-text-editor.error {
          border-color: #ff6b6b;
          box-shadow: 0 0 0 4px rgba(255,107,107,0.15);
        }

        .rich-text-editor p {
          margin: 0 0 8px 0;
        }

        .rich-text-editor p:last-child {
          margin-bottom: 0;
        }

        .rich-text-editor h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 16px 0 8px 0;
          color: #FF3EB5;
        }

        .rich-text-editor h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 12px 0 6px 0;
          color: #B989FF;
        }

        .rich-text-editor h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 10px 0 4px 0;
          color: #B989FF;
        }

        .rich-text-editor strong {
          font-weight: 700;
          color: #FF3EB5;
        }

        .rich-text-editor em {
          font-style: italic;
          color: #B989FF;
        }

        .rich-text-editor code {
          background: rgba(185,137,255,0.15);
          color: #B989FF;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
        }

        .rich-text-editor pre {
          background: rgba(18,18,20,0.8);
          border: 1px solid rgba(185,137,255,0.2);
          border-radius: 8px;
          padding: 16px;
          margin: 12px 0;
          overflow-x: auto;
        }

        .rich-text-editor pre code {
          background: none;
          padding: 0;
          color: #F5EDEE;
        }

        .rich-text-editor blockquote {
          border-left: 4px solid #B989FF;
          padding-left: 16px;
          margin: 12px 0;
          color: #9AA0A6;
          font-style: italic;
        }

        .rich-text-editor ul, .rich-text-editor ol {
          margin: 8px 0;
          padding-left: 24px;
        }

        .rich-text-editor li {
          margin: 4px 0;
        }

        .rich-text-editor .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9AA0A6;
          pointer-events: none;
          height: 0;
        }


        .editor-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding: 0 4px;
        }

        .word-count {
          color: #9AA0A6;
          font-size: 11px;
        }

        .word-limit {
          color: #9AA0A6;
          font-size: 11px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
