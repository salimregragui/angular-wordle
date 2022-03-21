import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() generateNewGame: EventEmitter<any> = new EventEmitter();
  @Input() gameState: string;
  @Input() word: string;

  constructor() {}

  ngOnInit(): void {}

  generateNewGameHandler(): void {
    this.generateNewGame.emit('');
  }
}
