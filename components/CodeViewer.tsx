import React from 'react';
import { Copy, Check, Terminal, Loader2, AlertTriangle } from 'lucide-react';

interface CodeViewerProps {
  code: string | null;
  isLoading: boolean;
  error: string | null;
  gameTitle: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, isLoading, error, gameTitle }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 space-y-4">
        <Loader2 size={48} className="animate-spin text-blue-500" />
        <div className="text-center">
          <p className="text-lg font-medium text-white">Generating Java Code...</p>
          <p className="text-sm">Consulting the AI architect for {gameTitle}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-red-400 space-y-4">
        <div className="p-4 bg-red-900/20 rounded-full">
          <AlertTriangle size={48} />
        </div>
        <p className="text-lg font-medium">{error}</p>
        <p className="text-sm text-slate-500">Please check your API key or try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      {/* Code Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex items-center text-sm text-slate-400 ml-4 font-mono">
                <Terminal size={14} className="mr-2 text-blue-400" />
                {gameTitle.replace(/\s+/g, '')}.java
            </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative flex-1 overflow-auto custom-scrollbar p-6">
        <pre className="font-mono text-sm leading-relaxed text-blue-100">
            <code>
                {code}
            </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
