import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

@NgModule({
  declarations: [EpisodeListComponent, FavoritesListComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EpisodesModule {}
