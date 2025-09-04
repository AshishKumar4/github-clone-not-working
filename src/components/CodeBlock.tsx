import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface CodeBlockProps {
  language: string;
  code: string;
}
export function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        borderRadius: 'var(--radius)',
        backgroundColor: 'rgb(30, 30, 30)', // A slightly different dark for contrast
      }}
      codeTagProps={{
        style: {
          fontFamily: 'var(--font-mono)',
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}