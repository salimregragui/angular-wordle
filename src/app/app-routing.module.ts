import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './containers/game/game.component';
import { HelpComponent } from './containers/help/help.component';
import { LeaderboardComponent } from './containers/leaderboard/leaderboard.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { StatsComponent } from './containers/stats/stats.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
