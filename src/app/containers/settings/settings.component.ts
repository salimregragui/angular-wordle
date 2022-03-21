import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from 'src/app/services/game-service.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings = new FormGroup({
    maxWordLetters: new FormControl(3),
    maxGuesses: new FormControl(6),
    darkMode: new FormControl(true),
  });

  maxWordLettersChoices: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11];
  maxGuessesChoices: number[] = [4, 5, 6, 7, 8, 9, 10];

  constructor(
    private notificationService: NotificationsService,
    private gameService: GameService
  ) {
    let gameData = localStorage.getItem('game-data');
    if (gameData) {
      let currentSettings = JSON.parse(gameData);

      this.settings.controls['maxWordLetters'].setValue(
        currentSettings.settings.maxWordLetters
      );
      this.settings.controls['maxGuesses'].setValue(
        currentSettings.settings.maxGuesses
      );
      this.settings.controls['darkMode'].setValue(
        currentSettings.settings.true
      );
    }
  }

  ngOnInit(): void {}

  resetSettings(): void {
    let gameData = localStorage.getItem('game-data');
    if (gameData) {
      let currentSettings = JSON.parse(gameData);
      currentSettings.settings.maxWordLetters = 5;
      currentSettings.settings.maxGuesses = 6;
      currentSettings.settings.darkMode = true;

      localStorage.setItem('game-data', JSON.stringify(currentSettings));
    } else {
      let gameData = {
        settings: {
          maxWordLetters: 3,
          maxGuesses: 6,
          darkMode: true,
        },
      };

      localStorage.setItem('game-data', JSON.stringify(gameData));
    }
    this.settings.controls['maxWordLetters'].setValue(5);
    this.settings.controls['maxGuesses'].setValue(6);
    this.settings.controls['darkMode'].setValue(true);

    this.notificationService.addNotification({
      message: 'Settings reverted to default !',
      type: 'success',
    });

    this.gameService.generateNewGame();
  }

  settingsSubmitHandler(): void {
    let gameData = localStorage.getItem('game-data');

    if (gameData) {
      let currentSettings = JSON.parse(gameData);

      currentSettings.settings.maxWordLetters =
        this.settings.controls['maxWordLetters'].value;
      currentSettings.settings.maxGuesses =
        this.settings.controls['maxGuesses'].value;
      currentSettings.settings.darkMode =
        this.settings.controls['darkMode'].value;

      localStorage.setItem('game-data', JSON.stringify(currentSettings));
    } else {
      let gameData = {
        settings: {
          maxWordLetters: this.settings.controls['maxWordLetters'].value,
          maxGuesses: this.settings.controls['maxGuesses'].value,
          darkMode: this.settings.controls['darkMode'].value,
        },
      };

      localStorage.setItem('game-data', JSON.stringify(gameData));
    }
    this.notificationService.addNotification({
      message: 'Settings changed successfully',
      type: 'success',
    });

    this.gameService.generateNewGame();
  }

  clearGameHistory(): void {
    let gameData = localStorage.getItem('game-data');

    if (gameData) {
      let currentSettings = JSON.parse(gameData);

      if (currentSettings.games) {
        currentSettings.games = [];
      }

      localStorage.setItem('game-data', JSON.stringify(currentSettings));
      this.notificationService.addNotification({
        message: 'Game history removed !',
        type: 'success',
      });
    }
  }
}
