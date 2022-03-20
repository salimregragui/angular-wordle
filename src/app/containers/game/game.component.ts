import { Component, HostListener, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service.service';
import { Guess } from 'src/utils/Guess';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  currentGuess: number;
  currentLetter: number;
  guesses: Guess[];
  gameState: string;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService
      .getGuesses()
      .subscribe((guesses) => (this.guesses = guesses));

    this.gameService
      .getCurrentLetter()
      .subscribe((letter) => (this.currentLetter = letter));

    this.gameService
      .getCurrentGuess()
      .subscribe((guess) => (this.currentGuess = guess));

    this.gameService
      .getGameState()
      .subscribe((gameState) => (this.gameState = gameState));
  }

  generateNewGame(): void {
    this.gameService.generateNewGame();
  }
}
