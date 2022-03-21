import { Component, Input, OnInit } from '@angular/core';
import { Stat } from 'src/utils/Guess';

@Component({
  selector: 'app-stats-item',
  templateUrl: './stats-item.component.html',
  styleUrls: ['./stats-item.component.scss'],
})
export class StatsItemComponent implements OnInit {
  @Input() stat: Stat;
  actualGuesses: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.stat.guesses.forEach((guess) => {
      if (guess.letters[0].letter !== '') this.actualGuesses++;
    });
  }
}
