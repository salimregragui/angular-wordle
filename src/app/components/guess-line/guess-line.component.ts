import { Component, Input, OnInit } from '@angular/core';
import { Guess } from 'src/utils/Guess';

@Component({
  selector: 'app-guess-line',
  templateUrl: './guess-line.component.html',
  styleUrls: ['./guess-line.component.scss'],
})
export class GuessLineComponent implements OnInit {
  @Input()
  guess: Guess;
  
  constructor() {}

  ngOnInit(): void {}
}
