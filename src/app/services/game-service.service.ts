import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Guess } from 'src/utils/Guess';
import { isValidLetter } from 'src/utils/is-valid-letter';
import { Word } from 'src/utils/Word';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  word: string = 'sport';
  guesses: Guess[] = [];
  maxNumberOfGuesses: number = 6;
  maxWordLetter: number = 5;
  currentGuess: number;
  currentLetter: number;

  //for keyboard
  correctLetters: string[] = [];
  falseLetters: string[] = [];
  wrongPosLetters: string[] = [];

  constructor() {
    for (let i = 0; i < this.maxNumberOfGuesses; i++) {
      this.guesses.push({
        letters: Array.from(Array(this.maxWordLetter)).map((i) => {
          return {
            letter: '',
            isCorrect: '',
          };
        }),
      });
    }

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

  getWrongPosLetters(): Observable<string[]> {
    console.log(this.wrongPosLetters);
    return of(this.wrongPosLetters);
  }

  getCorrectLetters(): Observable<string[]> {
    console.log(this.correctLetters);
    return of(this.correctLetters);
  }

  getFalseLetters(): Observable<string[]> {
    console.log(this.falseLetters);
    return of(this.falseLetters);
  }

  keyPressHandle(letter: string): void {
    if (
      this.currentLetter <= this.maxWordLetter &&
      this.currentGuess <= this.maxNumberOfGuesses &&
      this.currentLetter >= 1 &&
      this.currentGuess >= 1 &&
      isValidLetter(letter)
    ) {
      if (letter !== 'Backspace' && letter !== 'Enter' && letter !== ' ') {
        this.guesses[this.currentGuess - 1].letters[this.currentLetter - 1] = {
          letter: letter,
          isCorrect: '',
        };

        this.currentLetter < 5 ? this.currentLetter++ : null;
      } else if (letter === 'Backspace') {
        this.guesses[this.currentGuess - 1].letters[this.currentLetter - 1] = {
          letter: '',
          isCorrect: '',
        };

        this.currentLetter > 1 ? this.currentLetter-- : null;
      } else if (
        letter === 'Enter' &&
        this.currentLetter === this.word.length &&
        this.guesses[this.currentGuess - 1].letters[
          this.guesses[this.currentGuess - 1].letters.length - 1
        ].letter !== ''
      ) {
        this.guesses[this.currentGuess - 1].letters = this.guesses[
          this.currentGuess - 1
        ].letters.map((letter, i) => {
          if (letter.letter === this.word[i]) {
            console.log('equl');
            this.correctLetters.push(letter.letter);
            this.wrongPosLetters = this.wrongPosLetters.filter(
              (l) => l !== letter.letter
            );

            this.correctLetters = [...new Set(this.correctLetters)];
            console.log('wrongpos', this.wrongPosLetters);
            console.log('correct', this.correctLetters);
          } else if (
            letter.letter !== this.word[i] &&
            this.word.includes(letter.letter)
          ) {
            console.log('wrong pos');
            this.wrongPosLetters.push(letter.letter);
          } else {
            console.log('wrong');
            this.falseLetters.push(letter.letter);
            this.falseLetters = [...new Set(this.falseLetters)];
          }

          return {
            letter: letter.letter,
            isCorrect:
              letter.letter === this.word[i]
                ? 'yes'
                : letter.letter !== this.word[i] &&
                  this.word.includes(letter.letter)
                ? 'wrong'
                : 'no',
          };
        });

        this.currentLetter = 1;
        this.currentGuess <= 5 ? this.currentGuess++ : null;
      }
    }
  }
}
