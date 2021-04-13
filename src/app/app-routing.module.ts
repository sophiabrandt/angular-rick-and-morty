import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeListComponent } from './features/episodes/episode-list/episode-list.component';
import { FavoritesListComponent } from './features/episodes/favorites-list/favorites-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'episodes' },
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'favorites', component: FavoritesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
