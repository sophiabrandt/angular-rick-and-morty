import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EpisodeListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EpisodesModule { }
