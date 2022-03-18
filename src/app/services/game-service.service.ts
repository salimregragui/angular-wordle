import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ENGLISH_WORDS } from 'src/utils/english-wordlist';
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
  maxWordLetter: number = 6;
  currentGuess: number;
  currentLetter: number;

  currentGuessSubject: Subject<number> = new BehaviorSubject<number>(1);
  currentLetterSubject: Subject<number> = new BehaviorSubject<number>(1);

  //for keyboard
  correctLetters: string[] = [];
  falseLetters: string[] = [];
  wrongPosLetters: string[] = [];

  constructor() {
    const wordsThatAreMaxWordLetter = ENGLISH_WORDS.filter(
      (word) => word.length === this.maxWordLetter
    );

    this.word =
      wordsThatAreMaxWordLetter[
        Math.floor(Math.random() * wordsThatAreMaxWordLetter.length)
      ];

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
    return this.currentLetterSubject.asObservable();
  }

  getCurrentGuess(): Observable<number> {
    return this.currentGuessSubject.asObservable();
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

        if (this.currentLetter < this.maxWordLetter) {
          this.currentLetter++;
          this.currentLetterSubject.next(this.currentLetter);
        }
      } else if (letter === 'Backspace') {
        this.guesses[this.currentGuess - 1].letters[this.currentLetter - 1] = {
          letter: '',
          isCorrect: '',
        };

        if (this.currentLetter > 1) {
          this.currentLetter--;
          this.currentLetterSubject.next(this.currentLetter);
        }
      } else if (
        letter === 'Enter' &&
        this.currentLetter === this.word.length &&
        this.guesses[this.currentGuess - 1].letters[
          this.guesses[this.currentGuess - 1].letters.length - 1
        ].letter !== ''
      ) {
        if (this.isValidWord()) {
          this.guesses[this.currentGuess - 1].letters = this.guesses[
            this.currentGuess - 1
          ].letters.map((letter, i) => {
            if (letter.letter === this.word[i]) {
              this.correctLetters.push(letter.letter);
            } else if (
              letter.letter !== this.word[i] &&
              this.word.includes(letter.letter)
            ) {
              this.wrongPosLetters.push(letter.letter);
            } else {
              this.falseLetters.push(letter.letter);
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
          this.currentLetterSubject.next(1);

          if (this.currentGuess <= this.maxNumberOfGuesses) {
            this.currentGuess++;
            this.currentGuessSubject.next(this.currentGuess);
          }
        }
      }
    }
  }

  isValidWord(): boolean {
    let wordJoined: string = '';
    this.guesses[this.currentGuess - 1].letters.forEach((letter) => {
      wordJoined += letter.letter;
    });

    console.log(wordJoined);

    if (ENGLISH_WORDS.includes(wordJoined)) {
      return true;
    } else {
      return false;
    }
  }
}
