import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Trophy, Target } from 'lucide-react';

const NumberGuessingGame: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Start by entering a number between 1 and 100!');
  const [attempts, setAttempts] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [history, setHistory] = useState<{ val: number, result: string }[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('I picked a number between 1 and 100.');
    setAttempts(0);
    setIsWon(false);
    setHistory([]);
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);

    if (isNaN(num)) {
      setMessage('Please enter a valid number.');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let result = '';
    if (num > targetNumber) {
      result = 'Too high';
      setMessage('Too high! Try again.');
    } else if (num < targetNumber) {
      result = 'Too low';
      setMessage('Too low! Try again.');
    } else {
      result = 'Correct';
      setMessage(`🎉 Correct! You guessed it in ${newAttempts} attempts.`);
      setIsWon(true);
    }

    setHistory(prev => [{ val: num, result }, ...prev]);
    setGuess('');
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl max-w-2xl mx-auto min-h-[500px]">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-4 ring-1 ring-indigo-500/50">
          <Target size={48} className="text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Number Guessing Game</h2>
        <p className="text-slate-400">Can you read the computer's mind?</p>
      </div>

      <div className="w-full max-w-md bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700 text-center min-h-[80px] flex items-center justify-center">
          <p className={`text-lg font-medium ${isWon ? 'text-emerald-400 animate-bounce' : 'text-indigo-300'}`}>
            {message}
          </p>
        </div>

        <form onSubmit={handleGuess} className="flex gap-2 mb-6">
          <input
            ref={inputRef}
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={isWon}
            placeholder="1-100"
            className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 font-mono text-lg"
          />
          <button
            type="submit"
            disabled={isWon || !guess}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guess
          </button>
        </form>

        {isWon && (
          <button
            onClick={startNewGame}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-colors animate-pulse"
          >
            <RefreshCcw size={20} />
            Play Again
          </button>
        )}
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Attempt History</h3>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">Attempts: {attempts}</span>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          {history.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-800/30 border border-slate-700/50 text-sm">
              <span className="font-mono text-slate-300">Guess: {item.val}</span>
              <span className={`font-bold ${
                item.result === 'Correct' ? 'text-emerald-400' : 
                item.result === 'Too high' ? 'text-orange-400' : 'text-blue-400'
              }`}>
                {item.result}
              </span>
            </div>
          ))}
          {history.length === 0 && (
            <div className="text-center text-slate-600 italic py-4">No guesses yet...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberGuessingGame;
