import React, { useState, useEffect } from 'react';
import { GameType, GameDefinition } from './types';
import { GAMES, STATIC_NUMBER_GUESS_CODE } from './constants';
import GameCard from './components/GameCard';
import CodeViewer from './components/CodeViewer';
import NumberGuessingGame from './components/NumberGuessingGame';
import { generateGameCode } from './services/geminiService';
import { Code2, Play, Sparkles, BookOpen, Coffee } from 'lucide-react';

const App: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<GameType>(GameType.NUMBER_GUESS);
  const [viewMode, setViewMode] = useState<'demo' | 'code'>('demo');
  const [generatedCodes, setGeneratedCodes] = useState<Record<string, string>>({
    [GameType.NUMBER_GUESS]: STATIC_NUMBER_GUESS_CODE
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedGame = GAMES.find(g => g.id === selectedGameId) || GAMES[0];

  useEffect(() => {
    // If we switch games, check if we need to fetch code
    // If it's Number Guessing, we already have it.
    // If we have cached it, use it.
    // Otherwise fetch.
    
    if (selectedGameId !== GameType.NUMBER_GUESS && !generatedCodes[selectedGameId]) {
      fetchCode(selectedGame);
    }

    // Default view mode: Number Guess defaults to 'demo' if available, others 'code'
    if (selectedGameId === GameType.NUMBER_GUESS) {
        // Keep user preference if they were already on demo, or default to demo
    } else {
        setViewMode('code');
    }
  }, [selectedGameId]);

  const fetchCode = async (game: GameDefinition) => {
    setLoading(true);
    setError(null);
    try {
      const code = await generateGameCode(game.title, game.tags);
      setGeneratedCodes(prev => ({
        ...prev,
        [game.id]: code
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 lg:w-96 bg-[#162032] border-r border-slate-800 flex flex-col h-screen overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-[#1e293b]/50">
          <div className="flex items-center gap-3 text-emerald-400 mb-1">
            <Coffee size={24} />
            <span className="font-bold text-lg tracking-tight text-white">JavaGenie</span>
          </div>
          <p className="text-xs text-slate-400">Master Java through simple games</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
            Available Projects
          </div>
          {GAMES.map(game => (
            <GameCard
              key={game.id}
              game={game}
              isActive={selectedGameId === game.id}
              onClick={() => setSelectedGameId(game.id)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-[#0f172a] text-xs text-slate-500 text-center">
          Powered by Gemini 2.5 Flash
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0f172a]/95 backdrop-blur z-10">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              {selectedGame.title}
              <span className={`text-xs px-2 py-1 rounded-full border ${
                selectedGame.difficulty === 'Beginner' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                selectedGame.difficulty === 'Intermediate' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                'border-red-500/30 text-red-400 bg-red-500/10'
              }`}>
                {selectedGame.difficulty}
              </span>
            </h1>
          </div>

          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
            {selectedGame.hasDemo && (
              <button
                onClick={() => setViewMode('demo')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'demo' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Play size={16} />
                Play Demo
              </button>
            )}
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'code' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Code2 size={16} />
              Java Code
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative">
          
          {/* Main View Render */}
          {viewMode === 'demo' && selectedGame.hasDemo ? (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <NumberGuessingGame />
              <div className="mt-8 text-center text-slate-500 text-sm">
                This is a React simulation of the Java logic. Switch to the <strong>Java Code</strong> tab to see the actual implementation.
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <BookOpen size={16} />
                    <span>Read the code below, copy it, and run it in your Java IDE.</span>
                 </div>
                 {selectedGameId !== GameType.NUMBER_GUESS && (
                    <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-900/20 px-3 py-1 rounded-full border border-indigo-500/20">
                        <Sparkles size={12} />
                        AI Generated Code
                    </div>
                 )}
              </div>
              <div className="flex-1 min-h-0">
                <CodeViewer 
                    code={generatedCodes[selectedGameId] || null} 
                    isLoading={loading}
                    error={error}
                    gameTitle={selectedGame.title}
                />
              </div>
              {selectedGameId !== GameType.NUMBER_GUESS && !loading && !error && (
                 <div className="mt-4 flex justify-end">
                     <button 
                        onClick={() => fetchCode(selectedGame)}
                        className="text-xs text-slate-500 hover:text-blue-400 underline transition-colors"
                     >
                        Regenerate Code
                     </button>
                 </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
