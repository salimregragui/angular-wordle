import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-letter',
  templateUrl: './guess-letter.component.html',
  styleUrls: ['./guess-letter.component.scss'],
})
export class GuessLetterComponent implements OnInit {
  @Input()
  letterValue: string = '';
  
  constructor() {}

  ngOnInit(): void {}
}
