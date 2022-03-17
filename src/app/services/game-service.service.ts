import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Guess } from 'src/utils/Guess';
import { Word } from 'src/utils/Word';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  word: string = 'sport';
  guesses: Guess[];
  currentGuess: number;
  currentLetter: number;

  constructor() {
    this.guesses = [
      {
        firstLetter: {
          letter: '',
          isCorrect: '',
        },
        secondLetter: {
          letter: '',
          isCorrect: '',
        },
        thirdLetter: {
          letter: '',
          isCorrect: '',
        },
        fourthLetter: {
          letter: '',
          isCorrect: '',
        },
        fifthLetter: {
          letter: '',
          isCorrect: '',
        },
      },
      {
        firstLetter: {
          letter: '',
          isCorrect: '',
        },
        secondLetter: {
          letter: '',
          isCorrect: '',
        },
        thirdLetter: {
          letter: '',
          isCorrect: '',
        },
        fourthLetter: {
          letter: '',
          isCorrect: '',
        },
        fifthLetter: {
          letter: '',
          isCorrect: '',
        },
      },
      {
        firstLetter: {
          letter: '',
          isCorrect: '',
        },
        secondLetter: {
          letter: '',
          isCorrect: '',
        },
        thirdLetter: {
          letter: '',
          isCorrect: '',
        },
        fourthLetter: {
          letter: '',
          isCorrect: '',
        },
        fifthLetter: {
          letter: '',
          isCorrect: '',
        },
      },
      {
        firstLetter: {
          letter: '',
          isCorrect: '',
        },
        secondLetter: {
          letter: '',
          isCorrect: '',
        },
        thirdLetter: {
          letter: '',
          isCorrect: '',
        },
        fourthLetter: {
          letter: '',
          isCorrect: '',
        },
        fifthLetter: {
          letter: '',
          isCorrect: '',
        },
      },
      {
        firstLetter: {
          letter: '',
          isCorrect: '',
        },
        secondLetter: {
          letter: '',
          isCorrect: '',
        },
        thirdLetter: {
          letter: '',
          isCorrect: '',
        },
        fourthLetter: {
          letter: '',
          isCorrect: '',
        },
        fifthLetter: {
          letter: '',
          isCorrect: '',
        },
      },
      {
        firstLetter: {
          letter: '',
          isCorrect: '',
        },
        secondLetter: {
          letter: '',
          isCorrect: '',
        },
        thirdLetter: {
          letter: '',
          isCorrect: '',
        },
        fourthLetter: {
          letter: '',
          isCorrect: '',
        },
        fifthLetter: {
          letter: '',
          isCorrect: '',
        },
      },
    ];

    this.currentLetter = 1;
    this.currentGuess = 1;
  }

  getGuesses(): Observable<Guess[]> {
    return of(this.guesses);
  }

  getCurrentLetter(): Observable<number> {
    return of(this.currentLetter);
  }

  getCurrentGuess(): Observable<number> {
    return of(this.currentGuess);
  }

  keyPressHandle(letter: string): void {
    console.log(letter + ' ' + this.currentLetter + ' ' + this.currentGuess);
    if (
      this.currentLetter <= 5 &&
      this.currentGuess <= 6 &&
      this.currentLetter >= 1 &&
      this.currentGuess >= 1
    ) {
      if (letter !== 'Backspace' && letter !== 'Enter' && letter !== ' ') {
        switch (this.currentLetter) {
          case 1:
            this.guesses[this.currentGuess - 1].firstLetter.letter = letter;
            break;
          case 2:
            this.guesses[this.currentGuess - 1].secondLetter.letter = letter;
            break;
          case 3:
            this.guesses[this.currentGuess - 1].thirdLetter.letter = letter;
            break;
          case 4:
            this.guesses[this.currentGuess - 1].fourthLetter.letter = letter;
            break;
          case 5:
            this.guesses[this.currentGuess - 1].fifthLetter.letter = letter;
            break;
        }

        this.currentLetter < 5 ? this.currentLetter++ : null;
      } else if (letter === 'Backspace') {
        switch (this.currentLetter) {
          case 1:
            this.guesses[this.currentGuess - 1].firstLetter.letter = '';
            break;
          case 2:
            this.guesses[this.currentGuess - 1].secondLetter.letter = '';
            break;
          case 3:
            this.guesses[this.currentGuess - 1].thirdLetter.letter = '';
            break;
          case 4:
            this.guesses[this.currentGuess - 1].fourthLetter.letter = '';
            break;
          case 5:
            this.guesses[this.currentGuess - 1].fifthLetter.letter = '';
            break;
        }

        this.currentLetter > 1 ? this.currentLetter-- : null;
      } else if (letter === 'Enter') {
        if (
          this.guesses[this.currentGuess - 1].firstLetter.letter ===
          this.word[0]
        ) {
          this.guesses[this.currentGuess - 1].firstLetter.isCorrect = 'yes';
        } else if (
          this.guesses[this.currentGuess - 1].firstLetter.letter !==
            this.word[0] &&
          this.word.includes(
            this.guesses[this.currentGuess - 1].firstLetter.letter
          )
        ) {
          this.guesses[this.currentGuess - 1].firstLetter.isCorrect = 'wrong';
        } else {
          this.guesses[this.currentGuess - 1].firstLetter.isCorrect = 'no';
        }

        if (
          this.guesses[this.currentGuess - 1].secondLetter.letter ===
          this.word[1]
        ) {
          this.guesses[this.currentGuess - 1].secondLetter.isCorrect = 'yes';
        } else if (
          this.guesses[this.currentGuess - 1].secondLetter.letter !==
            this.word[1] &&
          this.word.includes(
            this.guesses[this.currentGuess - 1].secondLetter.letter
          )
        ) {
          this.guesses[this.currentGuess - 1].secondLetter.isCorrect = 'wrong';
        } else {
          this.guesses[this.currentGuess - 1].secondLetter.isCorrect = 'no';
        }

        if (
          this.guesses[this.currentGuess - 1].thirdLetter.letter ===
          this.word[2]
        ) {
          this.guesses[this.currentGuess - 1].thirdLetter.isCorrect = 'yes';
        } else if (
          this.guesses[this.currentGuess - 1].thirdLetter.letter !==
            this.word[2] &&
          this.word.includes(
            this.guesses[this.currentGuess - 1].thirdLetter.letter
          )
        ) {
          this.guesses[this.currentGuess - 1].thirdLetter.isCorrect = 'wrong';
        } else {
          this.guesses[this.currentGuess - 1].thirdLetter.isCorrect = 'no';
        }

        if (
          this.guesses[this.currentGuess - 1].fourthLetter.letter ===
          this.word[3]
        ) {
          this.guesses[this.currentGuess - 1].fourthLetter.isCorrect = 'yes';
        } else if (
          this.guesses[this.currentGuess - 1].fourthLetter.letter !==
            this.word[3] &&
          this.word.includes(
            this.guesses[this.currentGuess - 1].fourthLetter.letter
          )
        ) {
          this.guesses[this.currentGuess - 1].fourthLetter.isCorrect = 'wrong';
        } else {
          this.guesses[this.currentGuess - 1].fourthLetter.isCorrect = 'no';
        }

        if (
          this.guesses[this.currentGuess - 1].fifthLetter.letter ===
          this.word[4]
        ) {
          this.guesses[this.currentGuess - 1].fifthLetter.isCorrect = 'yes';
        } else if (
          this.guesses[this.currentGuess - 1].fifthLetter.letter !==
            this.word[4] &&
          this.word.includes(
            this.guesses[this.currentGuess - 1].fifthLetter.letter
          )
        ) {
          this.guesses[this.currentGuess - 1].fifthLetter.isCorrect = 'wrong';
        } else {
          this.guesses[this.currentGuess - 1].fifthLetter.isCorrect = 'no';
        }

        this.currentLetter = 1;
        this.currentGuess <= 5 ? this.currentGuess++ : null;
      }
    }
  }
}
