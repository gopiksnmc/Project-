import { GameDefinition, GameType } from './types';
import { 
  Target, 
  Scissors, 
  Dices, 
  Grid3x3, 
  Ghost, 
  Gamepad2, 
  Crosshair, 
  HelpCircle, 
  BrainCircuit, 
  Map 
} from 'lucide-react';

export const GAMES: GameDefinition[] = [
  {
    id: GameType.NUMBER_GUESS,
    title: 'Number Guessing',
    description: 'The classic game where the computer picks a number and you guess it.',
    icon: 'target',
    hasDemo: true,
    difficulty: 'Beginner',
    tags: ['Console', 'Loops', 'Conditionals']
  },
  {
    id: GameType.RPS,
    title: 'Rock Paper Scissors',
    description: 'Battle the computer in this timeless hand game.',
    icon: 'scissors',
    hasDemo: false,
    difficulty: 'Beginner',
    tags: ['Console', 'Random', 'Logic']
  },
  {
    id: GameType.DICE_ROLL,
    title: 'Dice Roll',
    description: 'Simple luck-based game. Highest roll wins.',
    icon: 'dices',
    hasDemo: false,
    difficulty: 'Beginner',
    tags: ['Console', 'Math']
  },
  {
    id: GameType.TIC_TAC_TOE,
    title: 'Tic-Tac-Toe',
    description: 'A 3x3 grid strategy game for two players.',
    icon: 'grid',
    hasDemo: false,
    difficulty: 'Intermediate',
    tags: ['Arrays', 'Logic', '2D Loops']
  },
  {
    id: GameType.SNAKE,
    title: 'Snake',
    description: 'Eat apples, grow longer, don\'t hit the wall!',
    icon: 'ghost',
    hasDemo: false,
    difficulty: 'Intermediate',
    tags: ['Swing', 'Graphics', 'Events']
  },
  {
    id: GameType.PING_PONG,
    title: 'Ping Pong',
    description: 'Classic arcade tennis game with paddles.',
    icon: 'gamepad',
    hasDemo: false,
    difficulty: 'Intermediate',
    tags: ['Swing', 'Physics', 'Animation']
  },
  {
    id: GameType.SHOOTER_2D,
    title: '2D Shooter',
    description: 'Move a ship and shoot incoming enemies.',
    icon: 'crosshair',
    hasDemo: false,
    difficulty: 'Advanced',
    tags: ['Graphics', 'Collision', 'OOP']
  },
  {
    id: GameType.HANGMAN,
    title: 'Hangman',
    description: 'Guess the hidden word letter by letter.',
    icon: 'help',
    hasDemo: false,
    difficulty: 'Beginner',
    tags: ['Strings', 'Input', 'Logic']
  },
  {
    id: GameType.QUIZ,
    title: 'Quiz Game',
    description: 'Multiple choice questions to test your knowledge.',
    icon: 'brain',
    hasDemo: false,
    difficulty: 'Beginner',
    tags: ['Objects', 'Lists', 'IO']
  },
  {
    id: GameType.MAZE,
    title: 'Maze Runner',
    description: 'Navigate through a generated maze to find the exit.',
    icon: 'map',
    hasDemo: false,
    difficulty: 'Advanced',
    tags: ['Algorithms', '2D Arrays', 'Recursion']
  }
];

export const STATIC_NUMBER_GUESS_CODE = `import java.util.Random;
import java.util.Scanner;

public class NumberGuess {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Random rand = new Random();

        int number = rand.nextInt(100) + 1; // 1-100
        int guess = 0;
        int attempts = 0;

        System.out.println("🎯 Welcome to the Number Guessing Game!");
        System.out.println("I picked a number between 1 and 100.");
        System.out.println("Try to guess it!");

        while (guess != number) {
            System.out.print("Enter your guess: ");
            guess = input.nextInt();
            attempts++;

            if (guess > number) {
                System.out.println("Too high! Try again.");
            } 
            else if (guess < number) {
                System.out.println("Too low! Try again.");
            } 
            else {
                System.out.println("🎉 Correct! You guessed it in " + attempts + " attempts.");
            }
        }

        input.close();
    }
}`;
