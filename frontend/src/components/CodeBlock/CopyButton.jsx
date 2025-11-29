import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    try {
      // Try using the modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setError(false);
        
        // Reset after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } else {
        // Fallback method using textarea
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (success) {
          setCopied(true);
          setError(false);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        } else {
          throw new Error('Copy command failed');
        }
      }
    } catch (err) {
      console.error('Failed to copy code:', err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#22c4e0]"
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : error ? 'Failed to copy' : 'Copy code'}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : error ? (
        <Copy className="w-4 h-4 text-red-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-300" />
      )}
    </button>
  );
}

export default CopyButton;
