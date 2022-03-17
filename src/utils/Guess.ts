export interface Letter {
  letter: string;
  isCorrect: string;
}
export interface Guess {
  firstLetter: Letter;
  secondLetter: Letter;
  thirdLetter: Letter;
  fourthLetter: Letter;
  fifthLetter: Letter;
  isCorrect?: boolean;
}
