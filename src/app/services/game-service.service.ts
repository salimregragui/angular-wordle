import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ENGLISH_WORDS } from 'src/utils/english-wordlist';
import { Guess } from 'src/utils/Guess';
import { isValidLetter } from 'src/utils/is-valid-letter';
import { NotificationsService } from './notifications.service';

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

  currentGuessSubject: Subject<number> = new BehaviorSubject<number>(1);
  currentLetterSubject: Subject<number> = new BehaviorSubject<number>(1);
  guessesSubject: Subject<Guess[]> = new BehaviorSubject<Guess[]>([]);

  gameState: Subject<string> = new BehaviorSubject<string>('playing');

  //for keyboard
  correctLetters: string[] = [];
  falseLetters: string[] = [];
  wrongPosLetters: string[] = [];

  correctLettersSubject: Subject<string[]> = new BehaviorSubject<string[]>([]);
  falseLettersSubject: Subject<string[]> = new BehaviorSubject<string[]>([]);
  wrongPosLettersSubject: Subject<string[]> = new BehaviorSubject<string[]>([]);

  wordSubject: Subject<string> = new BehaviorSubject<string>('');

  constructor(private notificationService: NotificationsService) {
    this.generateNewGame();
  }

  getGuesses(): Observable<Guess[]> {
    return this.guessesSubject.asObservable();
  }

  getCurrentLetter(): Observable<number> {
    return this.currentLetterSubject.asObservable();
  }

  getCurrentGuess(): Observable<number> {
    return this.currentGuessSubject.asObservable();
  }

  getWrongPosLetters(): Observable<string[]> {
    return this.wrongPosLettersSubject.asObservable();
  }

  getCorrectLetters(): Observable<string[]> {
    return this.correctLettersSubject.asObservable();
  }

  getFalseLetters(): Observable<string[]> {
    return this.falseLettersSubject.asObservable();
  }

  getGameState(): Observable<string> {
    return this.gameState.asObservable();
  }

  getWord(): Observable<string> {
    return this.wordSubject.asObservable();
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

        this.guessesSubject.next(this.guesses);

        if (this.currentLetter < this.maxWordLetter) {
          this.currentLetter++;
          this.currentLetterSubject.next(this.currentLetter);
        }
      } else if (letter === 'Backspace') {
        this.guesses[this.currentGuess - 1].letters[this.currentLetter - 1] = {
          letter: '',
          isCorrect: '',
        };

        this.guessesSubject.next(this.guesses);

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
          let isCorrectWord: boolean = true;

          this.guesses[this.currentGuess - 1].letters = this.guesses[
            this.currentGuess - 1
          ].letters.map((letter, i) => {
            if (letter.letter === this.word[i]) {
              this.correctLetters.push(letter.letter);
              this.correctLettersSubject.next(this.correctLetters);
            } else if (
              letter.letter !== this.word[i] &&
              this.word.includes(letter.letter)
            ) {
              this.wrongPosLetters.push(letter.letter);
              this.wrongPosLettersSubject.next(this.wrongPosLetters);
              isCorrectWord = false;
            } else {
              this.falseLetters.push(letter.letter);
              this.falseLettersSubject.next(this.falseLetters);
              isCorrectWord = false;
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

          this.guessesSubject.next(this.guesses);

          this.currentLetter = 1;
          this.currentLetterSubject.next(1);

          if (this.currentGuess < this.maxNumberOfGuesses && !isCorrectWord) {
            this.currentGuess++;
            this.currentGuessSubject.next(this.currentGuess);
          } else {
            if (isCorrectWord) {
              this.gameState.next('won');
            } else {
              this.gameState.next('lost');
            }
          }
        } else {
          this.notificationService.addNotification({
            message: 'This word is not a valid english word !',
            type: 'error',
          });
        }
      }
    }
  }

  isValidWord(): boolean {
    let wordJoined: string = '';
    this.guesses[this.currentGuess - 1].letters.forEach((letter) => {
      wordJoined += letter.letter;
    });

    if (ENGLISH_WORDS.includes(wordJoined)) {
      return true;
    } else {
      return false;
    }
  }

  generateNewGame(): void {
    const wordsThatAreMaxWordLetter = ENGLISH_WORDS.filter(
      (word) => word.length === this.maxWordLetter
    );

    this.word =
      wordsThatAreMaxWordLetter[
        Math.floor(Math.random() * wordsThatAreMaxWordLetter.length)
      ];
    this.wordSubject.next(this.word);

    this.guesses = [];

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

    this.guessesSubject.next(this.guesses);
    this.gameState.next('playing');
    this.currentLetter = 1;
    this.currentGuess = 1;
    this.currentGuessSubject.next(1);
    this.currentLetterSubject.next(1);
    this.correctLetters = [];
    this.falseLetters = [];
    this.wrongPosLetters = [];
    this.correctLettersSubject.next([]);
    this.wrongPosLettersSubject.next([]);
    this.falseLettersSubject.next([]);
  }
}
