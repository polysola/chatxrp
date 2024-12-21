"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownResponseProps {
  content: string;
}

const MarkdownResponse: React.FC<MarkdownResponseProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          // Extract the ref from the props, as it's not a valid prop for SyntaxHighlighter
          const { ref, ...validProps } = props;
          return match ? (
            <SyntaxHighlighter
              {...validProps} // Spread only valid props
              style={atomDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...validProps}>
              {children}
            </code>
          );
        },
      }}
      className="text-sm overflow-hidden leading-7"
    >
      {content || ""}
    </ReactMarkdown>
  );
}

export default MarkdownResponse;
