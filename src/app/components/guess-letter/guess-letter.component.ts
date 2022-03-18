import { Component, Input, OnInit } from '@angular/core';
import { Letter } from 'src/utils/Guess';

@Component({
  selector: 'app-guess-letter',
  templateUrl: './guess-letter.component.html',
  styleUrls: ['./guess-letter.component.scss'],
})
export class GuessLetterComponent implements OnInit {
  @Input()
  letter: Letter;

  @Input()
  isCurrentLetter: boolean;

  constructor() {}

  ngOnInit(): void {}
}
