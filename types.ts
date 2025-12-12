export enum GameType {
  NUMBER_GUESS = 'NUMBER_GUESS',
  RPS = 'RPS',
  DICE_ROLL = 'DICE_ROLL',
  TIC_TAC_TOE = 'TIC_TAC_TOE',
  SNAKE = 'SNAKE',
  PING_PONG = 'PING_PONG',
  SHOOTER_2D = 'SHOOTER_2D',
  HANGMAN = 'HANGMAN',
  QUIZ = 'QUIZ',
  MAZE = 'MAZE'
}

export interface GameDefinition {
  id: GameType;
  title: string;
  description: string;
  icon: string;
  hasDemo: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface GameState {
  generatedCode: string | null;
  isLoading: boolean;
  error: string | null;
}
