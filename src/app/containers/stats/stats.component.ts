import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/utils/Guess';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  gameHistory: Stat[] = [];
  wonGames: Stat[] = [];
  lostGames: Stat[] = [];

  constructor() {
    const gameData = localStorage.getItem('game-data');

    if (gameData) {
      let currentData = JSON.parse(gameData);

      if (currentData.games) {
        this.gameHistory = currentData.games;
        this.wonGames = this.gameHistory.filter((gh) => gh.state === 'won');
        this.lostGames = this.gameHistory.filter((gh) => gh.state === 'lost');
      }
    }
  }

  ngOnInit(): void {}
}
