import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeListComponent } from './features/episodes/episode-list/episode-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'episodes' },
  { path: 'episodes', component: EpisodeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
