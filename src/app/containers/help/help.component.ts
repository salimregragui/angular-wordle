import { Component, OnInit } from '@angular/core';
import { Guess } from 'src/utils/Guess';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  guess: Guess = {
    letters: [
      { letter: 'T', isCorrect: 'no' },
      { letter: 'A', isCorrect: 'wrong' },
      { letter: 'B', isCorrect: 'no' },
      { letter: 'L', isCorrect: 'wrong' },
      { letter: 'E', isCorrect: 'yes' },
      { letter: 'S', isCorrect: 'yes' },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
