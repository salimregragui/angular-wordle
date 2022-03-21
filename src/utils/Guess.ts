export interface Letter {
  letter: string;
  isCorrect: string;
}
export interface Guess {
  letters: Letter[];
}

export interface Stat {
  word: string;
  guesses: Guess[];
  state: string;
}
