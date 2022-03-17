import { GameService } from 'src/app/services/game-service.service';
import { Letter } from './../../../utils/Guess';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  rows: string[][] = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Del'],
  ];

  falseLetters: string[] = [];
  correctLetters: string[] = [];
  wrongPosLetters: string[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getCorrectLetters().subscribe((correctLetters) => {
      console.log(correctLetters);
      this.correctLetters = correctLetters;
    });

    this.gameService.getFalseLetters().subscribe((falseLetters) => {
      console.log(falseLetters);
      this.falseLetters = falseLetters;
    });

    this.gameService.getWrongPosLetters().subscribe((wrongPosLetters) => {
      console.log(wrongPosLetters);
      this.wrongPosLetters = wrongPosLetters;
    });
  }

  letterClickHandler(letter: string) {
    const letterFormatted = letter === 'Del' ? 'Backspace' : letter;
    this.gameService.keyPressHandle(letterFormatted);
  }
}
