import React from 'react';
import { GameDefinition } from '../types';
import { Target, Scissors, Dices, Grid3x3, Ghost, Gamepad2, Crosshair, HelpCircle, BrainCircuit, Map } from 'lucide-react';

// Map string icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
  'target': Target,
  'scissors': Scissors,
  'dices': Dices,
  'grid': Grid3x3,
  'ghost': Ghost,
  'gamepad': Gamepad2,
  'crosshair': Crosshair,
  'help': HelpCircle,
  'brain': BrainCircuit,
  'map': Map
};

interface GameCardProps {
  game: GameDefinition;
  isActive: boolean;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isActive, onClick }) => {
  const Icon = IconMap[game.icon] || Gamepad2;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all duration-200 border group
        ${isActive 
          ? 'bg-blue-900/30 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
          : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 group-hover:text-white group-hover:bg-slate-600'}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
              {game.title}
            </h3>
            {game.hasDemo && (
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                Playable
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-md bg-slate-900/50 text-slate-500 border border-slate-700/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

export default GameCard;
