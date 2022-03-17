import { Component, HostListener } from '@angular/core';
import { GameService } from './services/game-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-wordle';
  keyPressed: string;

  constructor(private gameService: GameService) {}

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.gameService.keyPressHandle(event.key);
  }
}
