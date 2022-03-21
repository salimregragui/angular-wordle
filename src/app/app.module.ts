import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './containers/game/game.component';
import { LeaderboardComponent } from './containers/leaderboard/leaderboard.component';
import { StatsComponent } from './containers/stats/stats.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { HelpComponent } from './containers/help/help.component';
import { HeaderComponent } from './components/header/header.component';
import { GuessLineComponent } from './components/guess-line/guess-line.component';
import { GuessLetterComponent } from './components/guess-letter/guess-letter.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';
import { NotificationItemComponent } from './components/notification-center/notification-item/notification-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LeaderboardComponent,
    StatsComponent,
    SettingsComponent,
    HelpComponent,
    HeaderComponent,
    GuessLineComponent,
    GuessLetterComponent,
    KeyboardComponent,
    NotificationCenterComponent,
    NotificationItemComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
