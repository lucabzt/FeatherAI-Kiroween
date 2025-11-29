import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';

function CodeBlock({ code, language = 'python', filename }) {
  return (
    <div className="relative my-4 rounded-lg overflow-hidden bg-[#1e1e1e]">
      {filename && (
        <div className="px-4 py-2 bg-[#2d2d2d] text-gray-300 text-sm font-mono border-b border-gray-700 overflow-x-auto">
          {filename}
        </div>
      )}
      <div className="relative group overflow-x-auto">
        <CopyButton code={code} />
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1e1e1e',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              whiteSpace: 'pre',
            }
          }}
          showLineNumbers={false}
          wrapLines={false}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
