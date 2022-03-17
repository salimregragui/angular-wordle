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

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LeaderboardComponent,
    StatsComponent,
    SettingsComponent,
    HelpComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
